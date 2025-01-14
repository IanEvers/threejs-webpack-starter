const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../script.js'), 
    output:
    {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../docs')
    },
    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            minify: true
        }),
        new HtmlWebpackPlugin({
            filename: 'presentacion.html',
            template: path.resolve(__dirname, '../vistas/presentacion.html'),
            minify: true,
            chunks: []
        }),
        new HtmlWebpackPlugin({
            filename: 'cuento.html',
            template: path.resolve(__dirname, '../vistas/cuento.html'),
            minify: true,
            chunks: []
        }),
        new HtmlWebpackPlugin({
            filename: 'musica.html',
            template: path.resolve(__dirname, '../vistas/musica.html'),
            minify: true,
            chunks: []
        }),    
        new MiniCSSExtractPlugin()
    ],
    module:
    {
        rules:
        [
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use:
                [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use:
                [
                    {
                        loader: 'file-loader'
                    }
                ]
            },

            //texturas
            {
                test: /\.glb$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'textures/'
                        }
                    }
                ]
            },

            //audio
            {
                test: /\.mp3$/,
                include: path.resolve(__dirname, 'notas/'),
                loader: 'file-loader'
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            }
        ]
    }
}
