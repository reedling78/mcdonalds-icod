"use strict";
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");

function resolve(dir) {
	return path.join(__dirname, "..", dir);
}

module.exports = {
	context: path.resolve(__dirname, "../"),
	entry: {
		app: "./src/main.js"
	},
	output: {
		path: config.build.assetsRoot,
		filename: "[name].js",
		publicPath:
			process.env.NODE_ENV === "production"
				? config.build.assetsPublicPath
				: config.dev.assetsPublicPath
	},
	resolve: {
		extensions: [".js", ".vue", ".json"],
		alias: {
			vue$: "vue/dist/vue.esm.js",
			"@": resolve("src"),
			"@config": resolve("config"),
			"@screens": resolve("src/content/screens"),
			"@containers": resolve("src/content/containers"),
			"@components": resolve("src/content/components"),
			"@styles": resolve("src/styles"),
			"@devmode": resolve("src/devmode"),
			assets: resolve("src/assets/"),
			"@services": resolve("src/services/")
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				include: [
					resolve("src"),
					resolve("test"),
					resolve("node_modules/webpack-dev-server/client")
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: utils.assetsPath("img/[name].[ext]")
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: utils.assetsPath("media/[name].[ext]")
				}
			},
			{
				test: /\.(woff2?|woff|eot|ttf|otf)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: utils.assetsPath("fonts/[name].[ext]")
				}
			}
		]
	},
	node: {
		// prevent webpack from injecting useless setImmediate polyfill because Vue
		// source contains it (although only uses it if it's native).
		setImmediate: false,
		// prevent webpack from injecting mocks to Node native modules
		// that does not make sense for the client
		dgram: "empty",
		fs: "empty",
		net: "empty",
		tls: "empty",
		child_process: "empty"
	}
	// resolveLoader: {
	//   modules: [
	//     'node_modules',
	//     path.resolve(__dirname, 'loaders')
	//   ]
	// }
};
