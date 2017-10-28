const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = env => ({
    entry: {
        landingPage: ['./src/js/app.js', './src/styles/app.sass']
    },
    output: {
        path: path.resolve(__dirname, '../public'),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'pug-html-loader'
                    }
                ]
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [require('autoprefixer')]
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'assets/images/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            progressive: true,
                            optipng: {
                                optimizationLevel: 7,
                                interlaced: false
                            },
                            mozjpeg: {
                                quality: 60
                            },
                            gifsicle: {
                                optimizationLevel: 7,
                                interlaced: false
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{from: 'src/misc', to: '.'}]),
        new ExtractTextPlugin({
            filename: '[name].[hash].bundle.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'Hashtagwars',
            hash: true,
            filename: 'index.html',
            template: './src/templates/app.pug'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
        new webpack.optimize.UglifyJsPlugin()
    ]
})
