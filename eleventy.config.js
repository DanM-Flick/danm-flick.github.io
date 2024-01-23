const { format } = require('date-fns');

module.exports = function(eleventyConfig) {
	// assets
	eleventyConfig.addPassthroughCopy("./assets/styles.css");
	eleventyConfig.addPassthroughCopy("./assets/fonts/");
	eleventyConfig.addPassthroughCopy("./assets/images/");
	
	// filters
	eleventyConfig.addFilter("formattedDate", dateObj => {
		return format(dateObj, 'MM/dd/yyyy')
	})

	// collections
	eleventyConfig.addCollection("recentPosts", function(collectionApi) {
    return collectionApi.getFilteredByTag("post").slice(0, 6);
  });

	return {
		dir: {
			input: "content",
      includes: "../_includes",
		}
	};
};