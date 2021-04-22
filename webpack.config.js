const path = require('path')
const fs = require('fs')
const HMTLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');

const environment = require('./configuration/environment');

const templateFiles = fs.readdirSync(environment.paths.source).filter(file => path.extname(file).toLowerCase() === '.html')

const htmlPluginEntries = templateFiles.map((template) => new HMTLWebpackPlugin({
    inject: true,
    hash: false,
    filename: template,
    template: path.resolve(environment.paths.source, template),
    //favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
}));

module.exports = {
    target: 'web',
    entry: {
        app: path.resolve(environment.paths.source, 'js', 'app.js'),
    },
    output: {
        filename: 'js/[name].js',
        path: environment.paths.output,
    },
    module: {
        rules: [
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'images/design/[name].[hash:6].[ext]',
                            publicPath: '../',
                            limit: environment.limits.images,
                        },
                    },
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'fonts/[name].[hash:6].[ext]',
                            publicPath: '../',
                            limit: environment.limits.fonts,
                        },
                    },
                ],
            },
            {
                test: /\.(csv|json|xml)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'samples/[name].[hash:6].[ext]',
                            publicPath: '../',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new ImageMinimizerPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            minimizerOptions: {
                // Lossless optimization with custom option
                // Feel free to experiment with options for better result for you
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    [
                        'svgo',
                        {
                            plugins: extendDefaultPlugins([
                                {
                                    name: 'removeViewBox',
                                    active: false,
                                },
                            ]),
                        },
                    ],
                ],
            },
        }),
        new CleanWebpackPlugin({
            verbose: true,
            cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(environment.paths.source, 'images', 'content'),
                    to: path.resolve(environment.paths.output, 'images', 'content'),
                    toType: 'dir',
                    globOptions: {
                        ignore: ['*.DS_Store', 'Thumbs.db'],
                    },
                },
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(environment.paths.source, 'samples'),
                    to: path.resolve(environment.paths.output, 'samples',),
                    toType: 'dir',
                    globOptions: {
                        ignore: ['*.DS_Store', 'Thumbs.db'],
                    },
                },
            ],
        }),
    ].concat(htmlPluginEntries),
};

