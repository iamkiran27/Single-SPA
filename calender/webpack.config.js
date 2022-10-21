const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const webpack = require("webpack");


module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "spa",
    projectName: "calender",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    resolve: {
      fallback: {
        //     // assert: require.resolve('assert'),
        crypto: require.resolve("crypto-browserify"),
        //     // http: require.resolve('stream-http'),
        //     // https: require.resolve('https-browserify'),
        //     // os: require.resolve('os-browserify/browser'),
        //     // stream: require.resolve('stream-browserify'),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser.js",
      }),
    ],
    // modify the webpack config however you'd like to by adding to this object
  });
};
