const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = ({ mode }) => {
    mode = mode ?? "development";
    return {
        mode,
        devServer: {
            host: "127.0.0.1",
            port: 8080
        },
        entry: {
            main: [
                "@babel/polyfill",
                "./src/js/main.js"
            ]
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "./js/[name].js",
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./src/index.html"
            }),
            new MiniCssExtractPlugin({
                filename: "./css/main.css"
            })
        ],
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower-components)/,
                    loader: "babel-loader"
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: "./dist/assets/"
                            }
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    config: path.resolve(__dirname, "postcss.config.js")
                                }
                            }
                        }
                    ]
                }
            ]
        }
    };
};