import React from 'react';
import { shallow } from 'enzyme';
import td from 'testdouble';

require('testdouble-jest')(td, jest);

const nameOfList = 'nameOfList';
const listNameValue = 'listNameValue';
let NewList;
let openDialogCsvImport;
let mutationCreateListCsv;
describe('NewList', () => {
  beforeEach(() => {
    openDialogCsvImport = td.replace('../open-dialog-csv-import');
    td.when(openDialogCsvImport())
      .thenCallback(nameOfList);
    NewList = require('../NewList');
    mutationCreateListCsv = td.function();
  });

  afterEach(() => {
    td.reset();
  });

  it('matches snapshot', async () => {
    const wrapper = shallow(
      <NewList
        disabled={false}
        nameOfList={nameOfList}
        listNameValue={listNameValue}
        mutationCreateListCsv={mutationCreateListCsv}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('when form submits calls openDialogCsvImport', async () => {
    const wrapper = shallow(
      <NewList
        disabled={false}
        nameOfList={nameOfList}
        listNameValue={listNameValue}
        mutationCreateListCsv={mutationCreateListCsv}
      />,
    );
    wrapper.simulate('submit', { preventDefault() {} });
    td.verify(openDialogCsvImport(td.matchers.anything()));
  });

  it('when openDialogCsvImport calls back, mutationCreateListCsv is called', async () => {
    const wrapper = shallow(
      <NewList
        disabled={false}
        nameOfList={nameOfList}
        listNameValue={listNameValue}
        mutationCreateListCsv={mutationCreateListCsv}
      />,
    );
    wrapper.simulate('submit', { preventDefault() {} });
    const variables = {
      variables: {
        csvPath: nameOfList,
        name: listNameValue,
      },
    };
    td.verify(mutationCreateListCsv(variables));
  });
});
