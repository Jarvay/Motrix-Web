const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack5')

const devMode = process.env.NODE_ENV !== 'production'

console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV)

module.exports = {
  entry: ['./src/renderer/pages/index/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/[name]-[hash].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: { filename: '[name].js' }
        }
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              additionalData: '@import "@/components/Theme/Variables.scss";',
              sassOptions: {
                includePaths: [__dirname, 'src']
              }
            }
          }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              indentedSyntax: true,
              additionalData: '@import "@/components/Theme/Variables.scss";',
              sassOptions: {
                includePaths: [__dirname, 'src']
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: process.env.NODE_ENV === 'production',
            loaders: {
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
              scss: 'vue-style-loader!css-loader!sass-loader',
              less: 'vue-style-loader!css-loader!less-loader'
            }
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset/inline'
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/main-[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new Webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default']
    }),
    new Webpack.DefinePlugin({
      // 'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  resolve: {
    extensions: ['.json', '.js', '.vue', '.css'],
    plugins: [],
    alias: {
      '@': path.join(__dirname, './src/renderer'),
      '@shared': path.join(__dirname, './src/shared'),
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  devtool:
    process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map',
  devServer: {
    open: true,
    port: 8888,
    compress: true,
    hot: true,
    proxy: {
      '/api': 'http://127.0.0.1:5000'
    }
  }
}
