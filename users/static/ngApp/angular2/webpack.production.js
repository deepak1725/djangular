const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const webpack = require('webpack');
const { NoEmitOnErrorsPlugin, EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack');
const { BaseHrefWebpackPlugin, SuppressExtractedTextChunksWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin, ModuleConcatenationPlugin, UglifyJsPlugin } = require('webpack').optimize;
const { LicenseWebpackPlugin } = require('license-webpack-plugin');
const { AotPlugin } = require('@ngtools/webpack');
var CompressionPlugin = require("compression-webpack-plugin");


const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const minimizeCss = true;
const baseHref = "";
const deployUrl = "";
const postcssPlugins = function () {
				// safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
				const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
				const minimizeOptions = {
						autoprefixer: false,
						safe: true,
						mergeLonghand: false,
						discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
				};
				return [
						postcssUrl({
								url: (URL) => {
										// Only convert root relative URLs, which CSS-Loader won't process into require().
										// if (!URL.startsWith('/') || URL.startsWith('//')) {
										//     return URL;
										// }
										if (deployUrl.match(/:\/\//)) {
												// If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
												return `${deployUrl.replace(/\/$/, '')}${URL}`;
										}
										else if (baseHref.match(/:\/\//)) {
												// If baseHref contains a scheme, include it as is.
												return baseHref.replace(/\/$/, '') +
														`/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
										}
										else {
												// Join together base-href, deploy-url and the original URL.
												// Also dedupe multiple slashes into single ones.
												return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
										}
								}
						}),
						autoprefixer(),
				].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
		};




module.exports = {
	"resolve": {
		"extensions": [
			".ts",
			".js"
		],
		"modules": [
			"./node_modules"
		],
		"symlinks": true
	},
	"resolveLoader": {
		"modules": [
			"./node_modules"
		]
	},
	"entry": {
		"main": [
			"./src/main.ts"
		],
		"polyfills": [
			"./src/polyfills.ts"
		],
		"styles": [
			"./src/styles.css"
		]
	},
	"output": {
		"path": path.join(process.cwd(), "prod"),
		"filename": "[name].bundle.js",
	},
	"module": {
		"rules": [
			{
				"enforce": "pre",
				"test": /\.js$/,
				"loader": "source-map-loader",
				"exclude": [
					/(\\|\/)node_modules(\\|\/)/
				]
			},
			{
				"test": /\.html$/,
				"loader": "raw-loader"
			},
			{
				"test": /\.(eot|svg|cur)$/,
				"loader": "file-loader?name=[name].[hash:20].[ext]"
			},
			{
				"test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
				"loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
			},
			{
				"exclude": [
					path.join(process.cwd(), "src/styles.css")
				],
				"test": /\.css$/,
				"use": [
					"exports-loader?module.exports.toString()",
					{
						"loader": "css-loader",
						"options": {
							"sourceMap": false,
							"importLoaders": 1
						}
					},
					{
						"loader": "postcss-loader",
						"options": {
							"ident": "postcss",
							"plugins": postcssPlugins
						}
					}
				]
			},
			{
				"exclude": [
					path.join(process.cwd(), "src/styles.css")
				],
				"test": /\.scss$|\.sass$/,
				"use": [
					"exports-loader?module.exports.toString()",
					{
						"loader": "css-loader",
						"options": {
							"sourceMap": false,
							"importLoaders": 1
						}
					},
					{
						"loader": "postcss-loader",
						"options": {
							"ident": "postcss",
							"plugins": postcssPlugins
						}
					},
					{
						"loader": "sass-loader",
						"options": {
							"sourceMap": false,
							"precision": 8,
							"includePaths": []
						}
					}
				]
			},
			{
				"exclude": [
					path.join(process.cwd(), "src/styles.css")
				],
				"test": /\.less$/,
				"use": [
					"exports-loader?module.exports.toString()",
					{
						"loader": "css-loader",
						"options": {
							"sourceMap": false,
							"importLoaders": 1
						}
					},
					{
						"loader": "postcss-loader",
						"options": {
							"ident": "postcss",
							"plugins": postcssPlugins
						}
					},
					{
						"loader": "less-loader",
						"options": {
							"sourceMap": false,
							"paths": []
						}
					}
				]
			},
			{
				"exclude": [
					path.join(process.cwd(), "src/styles.css")
				],
				"test": /\.styl$/,
				"use": [
					"exports-loader?module.exports.toString()",
					{
						"loader": "css-loader",
						"options": {
							"sourceMap": false,
							"importLoaders": 1
						}
					},
					{
						"loader": "postcss-loader",
						"options": {
							"ident": "postcss",
							"plugins": postcssPlugins
						}
					},
					{
						"loader": "stylus-loader",
						"options": {
							"sourceMap": false,
							"paths": []
						}
					}
				]
			},
			{
				"include": [
					path.join(process.cwd(), "src/styles.css")
				],
				"test": /\.css$/,
				"loaders": ExtractTextPlugin.extract({
					"use": [
						{
							"loader": "css-loader",
							"options": {
								"sourceMap": false,
								"importLoaders": 1
							}
						},
						{
							"loader": "postcss-loader",
							"options": {
								"ident": "postcss",
								"plugins": postcssPlugins
							}
						}
					],
					"publicPath": ""
				})
			},
			{
				"include": [
					path.join(process.cwd(), "src/styles.css")
				],
				"test": /\.scss$|\.sass$/,
				"loaders": ExtractTextPlugin.extract({
					"use": [
						{
							"loader": "css-loader",
							"options": {
								"sourceMap": false,
								"importLoaders": 1
							}
						},
						{
							"loader": "postcss-loader",
							"options": {
								"ident": "postcss",
								"plugins": postcssPlugins
							}
						},
						{
							"loader": "sass-loader",
							"options": {
								"sourceMap": false,
								"precision": 8,
								"includePaths": []
							}
						}
					],
					"publicPath": ""
				})
			},
			{
				"include": [
					path.join(process.cwd(), "src/styles.css")
				],
				"test": /\.less$/,
				"loaders": ExtractTextPlugin.extract({
					"use": [
						{
							"loader": "css-loader",
							"options": {
								"sourceMap": false,
								"importLoaders": 1
							}
						},
						{
							"loader": "postcss-loader",
							"options": {
								"ident": "postcss",
								"plugins": postcssPlugins
							}
						},
						{
							"loader": "less-loader",
							"options": {
								"sourceMap": false,
								"paths": []
							}
						}
					],
					"publicPath": ""
				})
			},
			{
				"include": [
					path.join(process.cwd(), "src/styles.css")
				],
				"test": /\.styl$/,
				"loaders": ExtractTextPlugin.extract({
					"use": [
						{
							"loader": "css-loader",
							"options": {
								"sourceMap": false,
								"importLoaders": 1
							}
						},
						{
							"loader": "postcss-loader",
							"options": {
								"ident": "postcss",
								"plugins": postcssPlugins
							}
						},
						{
							"loader": "stylus-loader",
							"options": {
								"sourceMap": false,
								"paths": []
							}
						}
					],
					"publicPath": ""
				})
			},
			{
				"test": /\.ts$/,
				"loader": '@ngtools/webpack',
			}
		]
	},
	"plugins": [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			output: {
				comments: false
			},
			sourceMap: false
		}),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new NoEmitOnErrorsPlugin(),
		new CopyWebpackPlugin([
			{
				"context": "/home/deepak/projects/crudapi/users/static/ngApp/angular2/src/",
				"to": "",
				"from": {
					"glob": "assets/**/*",
					"dot": true
				}
			},
			{
				"context": "/home/deepak/projects/crudapi/users/static/ngApp/angular2/src/",
				"to": "",
				"from": {
					"glob": "favicon.ico",
					"dot": true
				}
			}
		], {
			"ignore": [
				".gitkeep"
			],
			"debug": "warning"
		}),
		new ProgressPlugin(),
		new CircularDependencyPlugin({
			"exclude": /(\\|\/)node_modules(\\|\/)/,
			"failOnError": false
		}),
		new HtmlWebpackPlugin({
			"template": "../../../templates/ngApp/index.html",
			"filename": "./index.html",
			"hash": false,
			"inject": true,
			"compile": true,
			"favicon": false,
			"minify": {
				"caseSensitive": true,
				"collapseWhitespace": true,
				"keepClosingSlash": true
			},
			"cache": true,
			"showErrors": true,
			"chunks": "all",
			"excludeChunks": [],
			"title": "Webpack App",
			"xhtml": true,
			"chunksSortMode": function sort(left, right) {
				let leftIndex = entryPoints.indexOf(left.names[0]);
				let rightindex = entryPoints.indexOf(right.names[0]);
				if (leftIndex > rightindex) {
						return 1;
				}
				else if (leftIndex < rightindex) {
						return -1;
				}
				else {
						return 0;
				}
		}
		}),
		new BaseHrefWebpackPlugin({}),
		new webpack.optimize.CommonsChunkPlugin({
			"name" : 'common', 
			"filename" : 'common.js',
		}),
		new ExtractTextPlugin({
			"filename": "[name].bundle.css"
		}),
		new SuppressExtractedTextChunksWebpackPlugin(),
		
		new EnvironmentPlugin({
			"NODE_ENV": "production"
		}),
		new HashedModuleIdsPlugin({
			"hashFunction": "md5",
			"hashDigest": "base64",
			"hashDigestLength": 4
		}),
		new UglifyJsPlugin({
			"mangle": {
				"screw_ie8": true
			},
			"compress": {
				"screw_ie8": true,
				"warnings": false
			},
			"output": {
				"ascii_only": true
			},
			"sourceMap": false,
			"comments": false
		}),
		new AotPlugin({
			"mainPath": "main.ts",
			"hostReplacementPaths": {
			  "environments/environment.ts": "environments/environment.prod.ts"
			},
			"exclude": [],
			"tsConfigPath": "src/tsconfig.app.json",
			"skipCodeGeneration": true
		})
	],
	"node": {
		"fs": "empty",
		"global": true,
		"crypto": "empty",
		"tls": "empty",
		"net": "empty",
		"process": true,
		"module": false,
		"clearImmediate": false,
		"setImmediate": false
	},
	"devServer": {
		"historyApiFallback": true
	}
};
