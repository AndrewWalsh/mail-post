/* eslint global-require: off */

const developmentEnvironments = ['development', 'test'];

const developmentPlugins = [require('react-hot-loader/babel')];

const productionPlugins = [
  // babel-preset-react-optimize
  require('@babel/plugin-transform-react-constant-elements'),
  require('@babel/plugin-transform-react-inline-elements'),
  require('babel-plugin-transform-react-remove-prop-types'),
];

module.exports = (api) => {
  const development = api.env(developmentEnvironments);

  return {
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

      require('@babel/plugin-proposal-export-default-from'),
      require('@babel/plugin-proposal-object-rest-spread'),

      ...(development ? developmentPlugins : productionPlugins),
    ],
  };
};

// {
//   "presets": [
//     ["env", {
//       "targets": { "node": 8 },
//       "useBuiltIns": true
//     }],
//     "stage-0",
//     "react"
//   ],
//   "plugins": [
//     "add-module-exports",
//     "styled-components",
//     "transform-object-rest-spread"
//   ],
//   "env": {
//     "production": {
//       "presets": ["react-optimize"],
//       "plugins": ["dev-expression"]
//     },
//     "development": {
//       "plugins": [
//         "transform-class-properties",
//         "transform-es2015-classes"
//       ]
//     }
//   }
// }
