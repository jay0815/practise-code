const webpack = require('webpack');
const { getMiniVuePath, genPath, getComponentFiles } = require('./filePath');
const { VueLoaderPlugin } = require('vue-loader');
const fs = require('fs');

const JavaScript_Place = "<!-- js replace place -->";
const CSS_Place = "<!-- css replace place -->"

const template = `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    ${CSS_Place}
    ${JavaScript_Place}
  </body>
  </html>
`;

const runWebPack = (content, sse) => {
  fs.writeFileSync(getComponentFiles, content, { encoding: 'utf-8' })
  const compiler = webpack({
    mode: 'production',
    entry: getMiniVuePath,
    output: {
      path: genPath([]),
      filename: 'bundle.[contenthash].js',
      publicPath: '/static/'
    },
    devtool: "source-map",
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.runtime.esm-bundler.js'
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          oneOf: [
            {
              test: /\.css$/,
              use: [
                'vue-style-loader',
                // MiniCssExtractPlugin.loader,
                'css-loader',
              ]
            },
            {
              test: /\.scss$/,
              use: [
                'vue-style-loader',
                'css-loader',
                // MiniCssExtractPlugin.loader,
                'sass-loader',
              ]
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
          loader: "url-loader",
          options: {
            limit: 8192,
          },
        },
        {
          test: /\.(svg)(\?.*)?$/,
          loader: "url-loader",
          options: {
            limit: 8192,
          },
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  });

  compiler.run((err, stats) => {
    if (!err) {
      // console.log(stats);
      const { assets, hash } = stats.toJson({ assets: true });
      let html = template;
      assets.forEach(({ name }) => {
        if (name.includes('css')) {
          html = html.replace(CSS_Place, `<link href="./${name}" id="css" rel="stylesheet" type="text/css"/>`)
        }
        if (name.includes('js')) {
          html = html.replace(JavaScript_Place, `<script src="./${name}" id="js"></script>`)
        }
      });
      fs.writeFileSync(genPath(['index', hash, 'html']), html, { encoding: 'utf-8' });
      // sse
      sse.send(hash, 'html')
    }
    compiler.close((e) => {
      console.log(e);
    });
  }); 
};

module.exports = {
  runWebPack
}