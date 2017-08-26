const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        landingPage: [
            './src/client/js/app.js',
            './src/client/styles/app.sass',
            './src/client/templates/app.pug'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public'),
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
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        host: '0.0.0.0',
        open: true,
        compress: true,
        hot: true,
        inline: true,
        port: 3000,
        stats: 'errors-only'
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/client/assets/misc', to: '.' },
        ]),
        new HtmlWebpackPlugin({
            title: 'App',
            hash: true,
            filename: 'index.html',
            template: './src/client/templates/app.pug'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
}
