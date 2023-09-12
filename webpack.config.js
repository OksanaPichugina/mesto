const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode : 'development',
    entry : {
        main: './src/pages/index.js'
    },
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : 'dist.js',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { 
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }, 
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash][ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/pages/index.html',
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
    ],
};