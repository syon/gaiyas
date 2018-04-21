const webpack = require('webpack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  context: `${__dirname}/src`,

  entry: {
    javascript: './app.js',
  },

  output: {
    path: `${__dirname}/www`,
    filename: 'bundle.js',
  },

  devServer: {
    contentBase: 'www',
    port: 3000,
  },

  mode: process.env.NODE_ENV !== "production" ? "development" : "production",
  devtool: 'source-map',

  module: {
    rules: [
      {
        // https://github.com/babel/babel-loader
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({ browsers: ['IE 9', 'IE 10', 'IE 11', 'last 2 versions'] }),
                require('precss')
              ]
            }
          }
        ]
      },
      {
        test: /\.(svg)$/,
        loader: 'url-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new BrowserSyncPlugin({
      server: { baseDir: ['./www'] },
    }),
  ]
}
