var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'dist');
var TPL_PATH = path.resolve(APP_PATH,'template');
var NODE_MODULES = path.resolve(ROOT_PATH,'node_modules');

var webpackConfig={
    entry:{
        app:path.resolve(APP_PATH,'main.jsx'),
        vendor:['moment']
    },
    output:{
        path:BUILD_PATH,
        filename:'[name].bundle.[hash].js'
    },
    devServer: {
        hot: true,
        inline: true
    },
    devtool:'eval-source-map',
    resolve:{
        extensions:['','.js','.jsx']
    },
    module: {
        loaders: [
            {
                test:/\.css$/,
                loader:['style','css','postcss']
            },{
                test:/\.styl$/,
                loader:['style','css','postcss','stylus']
            },{
                test:/\.(jsx|js)$/,
                exclude:/(node_modules|bower_components)/,
                loader:['babel'],
                query:{
                    presets:['es2015']
                }
            }
        ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            filename:'vendor.js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle:{
                except:['vendor']
            },
            minimize:true
        }),
        new HtmlWebpackPlugin({
            title:'My App',
            templateUrl:path.resolve(TPL_PATH)+'index.html',
            filename:path.resolve(APP_PATH,'index.html'),
            inject:'body',
            chunks:['app']
        }),
    ]
}

