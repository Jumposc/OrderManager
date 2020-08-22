const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
module.exports = {
    entry:'./src/index.tsx',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'main.js'
    },
    devServer:{
        hot:true,
        port:"8080",
        // open:true
    },
    mode:'production',
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(htm|html)$/,
                use:[
                    'raw-loader'
                ]
            },
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    limit:1000,
                    name:'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(jsx)?$/,
                exclude:/(node_modules|bower_components)/,
                loader:'babel-loader'
            },
            {
                test: /\.tsx?$/,
                loader:'ts-loader',
                exclude: /node_modules/
            }
        ],
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template:"./src/template.html"
        })

    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['src/assets', 'node_modules'],
        symlinks: false
    },
}