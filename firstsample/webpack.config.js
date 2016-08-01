var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

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
                test:/\.jsx?$/,
                include:APP_PATH,
                loader:['babel'],
                query:{
                    presets:['es2015','react']
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'My App',
            inject:'body',
            chunks:['app','vendor']
        }),
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
        
    ]
}

module.exports = webpackConfig;