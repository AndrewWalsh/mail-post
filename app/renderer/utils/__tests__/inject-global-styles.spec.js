import td from 'testdouble';

require('testdouble-jest')(td, jest);

let styled;
let injectGlobalStyles;
describe('injectGlobalStyles', () => {
  beforeEach(() => {
    styled = td.replace('styled-components');
    injectGlobalStyles = require('../inject-global-styles');
  });

  it('calls injectGlobal', async () => {
    injectGlobalStyles();
    td.verify(styled.injectGlobal(td.matchers.anything()));
  });
});
