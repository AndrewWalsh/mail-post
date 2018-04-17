import React from 'react';
import { shallow } from 'enzyme';
import td from 'testdouble';

require('testdouble-jest')(td, jest);

const nameOfList = 'nameOfList';
const listNameValue = 'listNameValue';
let NewList;
let openDialogCsvImport;
describe('NewList', () => {
  beforeEach(() => {
    openDialogCsvImport = td.replace('../open-dialog-csv-import');
    NewList = require('../NewList');
  });

  afterEach(() => {
    td.reset();
  });

  it('matches snapshot', async () => {
    const wrapper = shallow(<NewList nameOfList={nameOfList} listNameValue={listNameValue} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('when form submits calls openDialogCsvImport', async () => {
    const wrapper = shallow(<NewList nameOfList={nameOfList} listNameValue={listNameValue} />);
    wrapper.simulate('submit', { preventDefault() {} });
    td.verify(openDialogCsvImport(listNameValue));
  });
});
