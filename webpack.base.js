const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                            'react',
                            'stage-0',
                            ['env', { targets: { browsers: ['last 2 versions'] } }]
                    ]
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(isProduction),
            DEVELOPMENT: JSON.stringify(!isProduction),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
        })
    ],
};
