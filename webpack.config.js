const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env) => {
    let path = require('path')
    let clientPath = path.resolve(__dirname, 'src')
    let outputPath = path.resolve(__dirname, (env == 'production') ? 'dist' : 'out')

    return {
        mode: (env == 'development') ? 'development' : 'production',
        entry: clientPath + '/index.js',
        output: {
            path: outputPath,
            filename: '[name].js'
        },
        optimization: {
            minimizer: (env == 'production') ? [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                })
            ] : [
                new HtmlWebpackPlugin({
                    template: path.resolve(__dirname, 'src', 'index.html'),
                    filename: path.resolve(__dirname, 'out', 'index.html'),
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                    }
                })
            ]
        },
        module: {
            rules: [{
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }, {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader'
            }, {
                test: /\.ts$/,
                use: 'awesome-typescript-loader'
            }, {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [ 'es2015', { modules: false } ]
                        ]
                    }
                }]
            }]
        },
        resolve: {
            extensions: [ ".ts", ".js", ".json" ]
        },
        devServer: {
            port: 3000,
            inline: true,
            hot: false,
            open: true,
            contentBase: path.resolve(__dirname, 'out'),
            watchContentBase: true
        }
    }
}
