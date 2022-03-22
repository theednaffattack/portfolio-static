// eleventy.js
module.exports = function (eleventyConfig) {
  // see 11ty's passthrough copy docs for more: https://www.11ty.dev/docs/copy/
  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("notes");

  return {
    dir: {
      input: "pages",
    },
  };
};
