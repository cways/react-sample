var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');

var webpackConfig = {
    entry:{
        app:path.resolve(APP_PATH,'main.jsx'),
        vendor:['moment','lodash']
    },
    output:{
        path:BUILD_PATH,
        filename:'[name].bundle.[hash].js'
    },
    resolve:{
        extensions:['','.js','.jsx','.styl']
    },
    devServer:{
        hot:true
    },
    module:{
        preloaders:[],
        loaders:[
            {
                test:/\.styl$/,
                loader:['style','css','stylus']
            },
            {
                test:/\.jsx$/,
                loader:['babel'],
                query:{
                    presets:['es2015','react']
                }
            }
        ],
        postloaders:[]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            filename:'vendor.js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize:true,
            mangle:{
                except:['vendor']
            }
        }),
        new HtmlWebpackPlugin({
            inject:'body',
            chunks:['app','vendor']
        })
    ]
}

module.exports = webpackConfig;