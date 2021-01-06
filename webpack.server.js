const path = require('path');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    target: 'node',
    entry: './server/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|svg|ttf|gif|eot|woff|woff|woff2)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: "[path][name].[ext]",
                    },
                  },
                ],
              },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(isProduction),
            DEVELOPMENT: JSON.stringify(!isProduction),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
        }),
        new webpack.IgnorePlugin({resourceRegExp: /\.css$/}),
    ],
    externals: [webpackNodeExternals()],
};

/*
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  target: 'node',
  entry: './server/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
*/
