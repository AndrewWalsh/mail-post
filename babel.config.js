/* eslint global-require: off */

const developmentEnvironments = ['development', 'test'];

const developmentPlugins = [require('react-hot-loader/babel')];

const productionPlugins = [
  require('@babel/plugin-transform-react-constant-elements'),
  require('@babel/plugin-transform-react-inline-elements'),
  require('babel-plugin-transform-react-remove-prop-types'),
];

module.exports = (api) => {
  const development = api.env(developmentEnvironments);

  return {
    sourceType: 'unambiguous',
    presets: [
      [
        require('@babel/preset-env'),
        {
          targets: { electron: require('electron/package.json').version },
          useBuiltIns: 'usage',
        },
      ],
      [require('@babel/preset-react'), { development }],
    ],
    plugins: [
      require('babel-plugin-styled-components'),

      require('@babel/plugin-proposal-object-rest-spread'),

      ...(development ? developmentPlugins : productionPlugins),
    ],
  };
};
