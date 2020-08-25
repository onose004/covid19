const path = require("path");

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("react-docgen-typescript-loader")
      },
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: { parser: 'typescript' }
      }
    ]
  });
  config.resolve.extensions.push(".ts", ".tsx");
  config.resolve.modules = ["node_modules", path.resolve(__dirname, "../src")];
  return config;
};
