const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const mode = process.env.NODE_ENV || 'development';
const dev = mode === 'development';

console.log('NODE_ENV = ' + mode);

module.exports = {
    mode,
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    // configFile,
                    projectReferences: true,
                    compilerOptions: {
                        sourceMap: dev,
                        declaration: dev,
                        declarationMap: dev
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { modules: 'global', localsConvention: 'camelCaseOnly' } },
                    'sass-loader'
                ]
            }
        ],
    },
    devtool: dev ? "source-map" : undefined,
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5000',
                pathRewrite: {'^/api' : ''}
            }
        },
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new Dotenv({ systemvars: true })
    ]
};