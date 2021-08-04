const path = require("path");
const HTMLWP = require("html-webpack-plugin");
const { CleanWebpackPlugin: CleanWP } = require("clean-webpack-plugin");
const MiniCssExtractWP = require("mini-css-extract-plugin");
const CopyWP = require("copy-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: {
		main: "./index.js",
	},
	output: {
		filename: "[name].[hash].js",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		//extensions, alias
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},
	plugins: [
		new HTMLWP({
			template: "./index.html",
			minify: {
				collapseWhitespace: true,
			},
		}),
		new CleanWP(),
		new MiniCssExtractWP({
			filename: "[name].[hash].css",
		}),
		new CopyWP({
			patterns: [{ from: "./assets/logo.svg", to: "./../dist/assets" }],
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractWP.loader, "css-loader"],
			},
			{ test: /\.(png|jpg|jpeg|gif)$/, use: ["file-loader"] },
			{ test: /\.(ttf|woff|woff2|eot)$/, use: ["file-loader"] },
			{
				test: /\.s[ac]ss$/,
				use: [MiniCssExtractWP.loader, "css-loader", "sass-loader"],
			},
		],
	},
};
