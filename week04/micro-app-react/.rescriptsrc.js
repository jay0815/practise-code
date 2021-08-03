const { name } = require('./package');

module.exports = [
  ["use-babel-config", ".babelrc"],
  {
    webpack: (config) => {
      config.output.library = `${name}-[name]`;
      config.output.libraryTarget = 'umd';
      config.output.jsonpFunction = `webpackJsonp_${name}`;
      config.output.globalObject = 'window';
      config.output.publicPath = `//localhost:7001`;
      return config;
    },

    devServer: (_) => {
      const config = _;
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      };
      config.historyApiFallback = true;
      config.hot = false;
      config.watchContentBase = false;
      config.liveReload = false;
      config.port = 7001;
      return config;
    },
  }
]
