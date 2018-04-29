import React from 'react';
import { shallow } from 'enzyme';
import td from 'testdouble';

import NewListNameField from '../NewListNameField';
import NewListButton from '../NewListButton';

require('testdouble-jest')(td, jest);

describe('NewList', () => {
  let props;
  let NewList;
  let openDialogCsvImport;
  let MUTATION_IMPORT_CSV;

  beforeEach(() => {
    MUTATION_IMPORT_CSV = td.function();
    props = {
      nameOfList: 'nameOfList',
      listNameValue: 'listNameValue',
      disabled: false,
      MUTATION_IMPORT_CSV,
      data: {
        lists: [],
      },
      invalid: false,
      reset: () => {},
    };
    openDialogCsvImport = td.replace('../open-dialog-csv-import');
    td.when(openDialogCsvImport())
      .thenCallback(props.nameOfList);
    NewList = require('../NewList');
  });

  afterEach(() => {
    td.reset();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<NewList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('when form submits calls openDialogCsvImport', () => {
    const wrapper = shallow(<NewList {...props} />);
    wrapper.simulate('submit', { preventDefault() {} });
    td.verify(openDialogCsvImport(td.matchers.anything()));
  });

  it('when form submits calls reset', () => {
    const reset = td.function();
    const wrapper = shallow(<NewList {...props} reset={reset} />);
    wrapper.simulate('submit', { preventDefault() {} });
    td.verify(reset());
  });

  it('when openDialogCsvImport calls back, MUTATION_IMPORT_CSV is called', () => {
    const wrapper = shallow(<NewList {...props} />);
    wrapper.simulate('submit', { preventDefault() {} });
    td.verify(MUTATION_IMPORT_CSV(td.matchers.anything()));
  });

  it('when disabled is true, NewListNameField disabled prop is true', () => {
    const disabled = true;
    const wrapper = shallow(<NewList {...props} disabled={disabled} />);
    const wrapperItem = wrapper.find(NewListNameField);
    expect(wrapperItem.prop('disabled')).toBeTruthy();
  });

  it('when disabled is true, NewListNameField disabled prop is true', () => {
    const disabled = false;
    const wrapper = shallow(<NewList {...props} disabled={disabled} />);
    const wrapperItem = wrapper.find(NewListNameField);
    expect(wrapperItem.prop('disabled')).toBeFalsy();
  });

  it('when disabled is true, NewListButton disabled prop is true', () => {
    const disabled = true;
    const wrapper = shallow(<NewList {...props} disabled={disabled} />);
    const wrapperItem = wrapper.find(NewListButton);
    expect(wrapperItem.prop('disabled')).toBeTruthy();
  });

  it('when disabled is true, NewListButton disabled prop is true', () => {
    const disabled = false;
    const wrapper = shallow(<NewList {...props} disabled={disabled} />);
    const wrapperItem = wrapper.find(NewListButton);
    expect(wrapperItem.prop('disabled')).toBeFalsy();
  });

  it('when listNameValue is an empty string, NewListButton disabled prop is true', () => {
    const listNameValue = '';
    const wrapper = shallow(<NewList {...props} listNameValue={listNameValue} />);
    const wrapperItem = wrapper.find(NewListButton);
    expect(wrapperItem.prop('disabled')).toBeTruthy();
  });

  it('when invalid is true, NewListButton disabled prop is true', () => {
    const invalid = true;
    const wrapper = shallow(<NewList {...props} invalid={invalid} />);
    const wrapperItem = wrapper.find(NewListButton);
    expect(wrapperItem.prop('disabled')).toBeTruthy();
  });
});
