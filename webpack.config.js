
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test')
  require('dotenv').config({ path: '.env.test'})
else if (process.env.NODE_ENV === 'development')
  require('dotenv').config({ path: '.env.development'})

module.exports = env => {

  const isProduction = env === 'production'
  const cssExtract = new ExtractTextPlugin('styles.css')

  return {
    entry: ['babel-polyfill', './src/app.jsx'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: cssExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        },
        {
          test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        }
      ]
    },
    resolve: {
      alias: {
        settings: path.resolve(__dirname, 'src/config/settings.js'),

        actions: path.resolve(__dirname, 'src/actions'),
        components: path.resolve(__dirname, 'src/components'),
        pages: path.resolve(__dirname, 'src/pages'),
        reducers: path.resolve(__dirname, 'src/reducers'),
        routers: path.resolve(__dirname, 'src/routers'),
        selectors: path.resolve(__dirname, 'src/selectors'),
        config: path.resolve(__dirname, 'src/config'),
        styles: path.resolve(__dirname, 'src/styles'),
        test: path.resolve(__dirname, 'src/test')
      },
      extensions: ['.js', '.jsx']
    },
    plugins: [
      cssExtract,
      new webpack.DefinePlugin({

        'process.env.FIREBASE_API_KEY': JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(
          process.env.FIREBASE_AUTH_DOMAIN
        ),
        'process.env.FIREBASE_DB_URL': JSON.stringify(
          process.env.FIREBASE_DB_URL
        ),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(
          process.env.FIREBASE_PROJECT_ID
        ),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(
          process.env.FIREBASE_STORAGE_BUCKET
        ),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
          process.env.FIREBASE_MESSAGING_SENDER_ID
        )

      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      port: 9000,
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  }
}
