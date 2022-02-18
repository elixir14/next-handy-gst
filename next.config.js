const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const webpack = require("webpack");
const path = require("path");

module.exports = withPlugins([[withSass], [withImages], [withCSS]], {
  webpack5: false,
  mainSrcDir: "main",
  // specify an alternate renderer src directory, defaults to 'renderer'
  rendererSrcDir: "renderer",

  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
});
