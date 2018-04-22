const path = require('path');

module.exports = {
  extends: 'airbnb',
  env: {
    browser: 'true',
    node: 'true'
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off'
  },
  plugins: [
    'import',
    'promise',
    'compat',
    'react'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, './webpack.config.eslint.js')
      }
    }
  }
}
