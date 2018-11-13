/*
 * @Author: xiaofan 
 * @Date: 2018-11-08 11:32:11 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-13 16:47:54
 */

var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 配置环境变量 dev / online 
var WEBPACK_ENV = process.env.WEBPACK_ENV || '';

// 获取HTML的webpack参数
var getHtmlWebpackPlugin = function (name, title) {
  return {
    template  : './src/view/' + name + '.html',
    filename   : 'view/' + name + '.html',
    inject    : true,
    title     : title,
    hash      : true,
    chunks    : ['common', name]
  };
};

var config = {
  entry: {
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js'],
    'common': ['./src/page/common/index.js'],
    'result': ['./src/page/result/index.js'],
  },
  output: {
    path: './dist', // 打包路径
    publicPath: '/dist', // 访问路径
    filename: 'js/[name].js',
  },
  module: {
    loaders: [{
        test: /\.css$/,
        loader: Ex.extract('style-loader', 'css-loader')
      }, {
        test: /\.string$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|gif|jpg|svg|woff|eot|ttf)\??.*$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          publicPath: '../', // 解决打包后路径不对的问题
          name: 'resource/[name].[ext]'
        }
      },
    ]
  },
  resolve: {
    alias: {
      node_modules: __dirname + '/node_modules',
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      images: __dirname + '/src/images',
    }
  },
  plugins: [
    // 独立通用模块到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js',
    }),
    // 单独打包处理css
    new Ex('css/[name].css'),
    // html处理
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('index', '首页')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('register', '用户注册')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('result', '操作结果')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('list', '结果列表')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('order-list', '订单中心')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('user-center', '个人中心')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('about', '关于MMall')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('cart', '购物车')),
  ],
};

if ('dev' === WEBPACK_ENV) {
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;