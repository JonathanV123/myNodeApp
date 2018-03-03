const path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: './public/javascript/locals-app.js'
    },
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        filename: 'locals-app.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['env']
            },
            test: /\.css$/,
            loader: "style-loader!css-loader",
        }],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}