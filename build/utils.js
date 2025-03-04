"use strict";
const path = require("path");
const config = require("../config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const packageConfig = require("../package.json");

exports.assetsPath = function(_path) {
	const assetsSubDirectory =
		process.env.NODE_ENV === "production"
			? path.join(config.build.assetsSubDirectory, _path)
			: path.posix.join(config.dev.assetsSubDirectory, _path);

	return assetsSubDirectory;
};

exports.cssLoaders = function(options) {
	options = options || {};

	const cssLoader = {
		loader: "css-loader",
		options: {
			sourceMap: options.sourceMap
		}
	};

	const postcssLoader = {
		loader: "postcss-loader",
		options: {
			sourceMap: options.sourceMap
		}
	};

	// generate loader string to be used with extract text plugin
	function generateLoaders(loader, loaderOptions) {
		const loaders = options.usePostCSS
			? [cssLoader, postcssLoader]
			: [cssLoader];

		if (loader) {
			loaders.push({
				loader: loader + "-loader",
				options: Object.assign({}, loaderOptions, {
					sourceMap: options.sourceMap
				})
			});
		}

		// Extract CSS when that option is specified
		// (which is the case during production build)
		if (options.extract) {
			return ExtractTextPlugin.extract({
				use: loaders,
				fallback: "vue-style-loader"
			});
		} else {
			return ["vue-style-loader"].concat(loaders);
		}
	}

	// https://vue-loader.vuejs.org/en/configurations/extract-css.html
	return {
		css: generateLoaders(),
		scss: [
			"vue-style-loader",
			"css-loader",
			"postcss-loader",
			"sass-loader",
			{
				loader: "sass-resources-loader",
				options: {
					resources: [
						path.resolve(__dirname, "..", "src/styles/lib/_color.scss"),
						path.resolve(__dirname, "..", "src/styles/lib/_variables.scss"),
						path.resolve(__dirname, "..", "src/styles/lib/_mixins.scss")
					]
				}
			}
		]
	};
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
	const output = [];
	const loaders = exports.cssLoaders(options);

	for (const extension in loaders) {
		const loader = loaders[extension];
		output.push({
			test: new RegExp("\\." + extension + "$"),
			use: loader
		});
	}

	return output;
};

exports.createNotifierCallback = () => {
	const notifier = require("node-notifier");

	return (severity, errors) => {
		if (severity !== "error") return;

		const error = errors[0];
		const filename = error.file && error.file.split("!").pop();

		notifier.notify({
			title: packageConfig.name,
			message: severity + ": " + error.name,
			subtitle: filename || "",
			icon: path.join(__dirname, "logo.png")
		});
	};
};
