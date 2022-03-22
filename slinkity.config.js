// slinkity.config.js
import { defineConfig } from "slinkity";
import rendererReact from "@slinkity/renderer-react";

export default defineConfig({
  renderers: [rendererReact],

  eleventyIgnores(ignores) {
    console.log("WATCH ALL IGNORES", { ignores });
    return ignores;
  },
});
