import configureStoreDev from './configure-store.dev';
import configureStoreProd from './configure-store.prod';

const selectedConfigureStore = (
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev
);

export const { configureStore } = selectedConfigureStore;

export const { history } = selectedConfigureStore;
