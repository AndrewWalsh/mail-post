const {
  NODE_ENV,
  DEBUG_PROD,
  UPGRADE_EXTENSIONS,
} = process.env;

const nodeEnv = NODE_ENV || 'production';
export {
  nodeEnv as NODE_ENV, // Cannot be set in the electron package
  DEBUG_PROD,
  UPGRADE_EXTENSIONS,
};
