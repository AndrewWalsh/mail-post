import { injectGlobal } from 'styled-components';

export default () => {
  // global styles https://www.styled-components.com/docs/api#injectglobal
  // eslint-disable-next-line
  injectGlobal`
    h1, h2, h3, h4, h5, h6, p {
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }
  `;
};
