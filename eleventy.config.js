const { format } = require('date-fns');

module.exports = function(eleventyConfig) {
	// assets
	eleventyConfig.addPassthroughCopy("./assets/styles.css");
	eleventyConfig.addPassthroughCopy("./assets/fonts/");
	
	// filters
	eleventyConfig.addFilter("formattedDate", dateObj => {
		return format(dateObj, 'MM/dd/yyyy')
	})

	return {
		dir: {
			input: "content",
      includes: "../_includes",
		}
	};
};