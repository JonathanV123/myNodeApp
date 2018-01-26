const path = require('path');

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
            }
        }]
    }
}

