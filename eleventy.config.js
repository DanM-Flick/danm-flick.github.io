module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./assets/styles.css");
	return {
		dir: {
			input: "content",
      includes: "../_includes",
		}
	};
};