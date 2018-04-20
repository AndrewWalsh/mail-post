import { injectGlobal } from 'styled-components';
import 'typeface-roboto/index.css';

export default () => {
  // global styles https://www.styled-components.com/docs/api#injectglobal
  // eslint-disable-next-line
  injectGlobal`
    * {
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 300;
    }
  `;
};
