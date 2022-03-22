const { join } = require("path");
// 1. import some new dependencies:
// - Vite's build command
// - requireFromString to turn that build output into a Node module
// - React's createElement + renderToString to squeeze the static HTML out of our component
const { build: viteBuild } = require("vite");
const requireFromString = require("require-from-string");
const { renderToString } = require("react-dom/server");
const React = require("react");
const mdxPlugin = require("@jamshop/eleventy-plugin-mdx");

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("notes");
  eleventyConfig.ignores.add("src");
  eleventyConfig.ignores.add("index-OLD.html");

  // we'll use this to generate a unique ID for each component root (formerly just "root" in our create-react-app example)
  let idCounter = 0;
  eleventyConfig.on("beforeBuild", function () {
    // reset the counter for each new build
    idCounter = 0;
  });

  // Copy `img/` to `_site/subfolder/img`
  eleventyConfig.addPassthroughCopy({ "src/public/js": "js" });
  eleventyConfig.addPassthroughCopy({
    "src/public/css": "css",
  });
  eleventyConfig.addPassthroughCopy({
    "src/public/favicon.svg": "favicon.svg",
  });

  eleventyConfig.addPlugin(mdxPlugin);
  eleventyConfig.addShortcode(
    "react",
    async function (componentPath, shipJavaScript) {
      idCounter += 1;
      const componentRootId = `component-root-${idCounter}`;
      // generate an absolute path to our component, relative to that "_includes" directory for simplicity
      const resolvedComponentPath = join(
        process.cwd(),
        "src/_includes",
        componentPath
      );
      // 2. Call "build" in SSR mode and grab the output
      const { output } = await viteBuild({
        root: "_site",
        build: {
          ssr: true,
          // prevents Vite from generating an output file
          write: false,
          rollupOptions: {
            input: resolvedComponentPath,
          },
        },
      });
      // 3. Use requireFromString to process the raw build output
      const { default: Component } = requireFromString(output[0].code);
      // 4. Use renderToString to grab our markup and throw it into our root <div>
      const html = renderToString(React.createElement(Component));
      return `
<div id="${componentRootId}">${html}</div>
${
  shipJavaScript
    ? `<script type="module">
import Component from ${JSON.stringify(resolvedComponentPath)};
import React from 'react';
import ReactDOM from 'react-dom';
const root = document.getElementById('${componentRootId}');
ReactDOM.hydrate(React.createElement(Component), root);
</script>`
    : ""
}

`;
    }
  );
};
