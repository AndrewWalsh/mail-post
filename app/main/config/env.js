const {
  NODE_ENV,
  DEBUG_PROD,
  UPGRADE_EXTENSIONS,
} = process.env;

export default {
  NODE_ENV: NODE_ENV || 'production', // Cannot be set in the electron package
  DEBUG_PROD,
  UPGRADE_EXTENSIONS,
};
