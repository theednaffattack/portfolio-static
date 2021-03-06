// eleventy.js
module.exports = function (eleventyConfig) {
  // see 11ty's passthrough copy docs for more: https://www.11ty.dev/docs/copy/
  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("notes");

  // eleventyConfig.addPassthroughCopy("public");
  // Create collection from _data/customData.js
  // getAll()[0].data.[customKey]
  eleventyConfig.addCollection("customDataCollection", (collection) => {
    // const allItems = collection.getAll()[0].data.customData;
    const allItems = collection.getAll();
    const allProjects = collection.getAll()[0].data.projects;
    const allBooks = collection.getAll()[0].data.readingList;

    // Filter or use another method to select the items you want
    // for the collection
    // return allItems.filter((item) => {
    //   // ...
    // });
    return allItems;
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "pages",
    },
  };
};
