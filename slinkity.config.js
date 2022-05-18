// slinkity.config.js
import { defineConfig } from "slinkity";
import rendererReact from "@slinkity/renderer-react";

export default defineConfig({
  renderers: [rendererReact],

  eleventyIgnores(ignores) {
    return ignores;
  },
});
