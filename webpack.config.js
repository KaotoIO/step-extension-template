const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const { dependencies } = require('./package.json');
const path = require("path");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3002,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx)?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "stepextension",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button",
      },
      shared: [{"react": { requiredVersion: dependencies["react"] }}, {"react-dom": { requiredVersion: dependencies["react-dom"] }}],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    cacheWithContext: false,
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json'),
      }),
    ],
    symlinks: false,
  },
  stats: 'errors-warnings',
};
