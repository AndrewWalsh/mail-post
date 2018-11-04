import React from 'react';
import { shallow } from 'enzyme';
import { last } from 'ramda';

import NewList from '../NewList';
import openDialogCsvImport from '../open-dialog-csv-import';
import NewListNameField from '../NewListNameField';
import NewListButton from '../NewListButton';

jest.mock('../open-dialog-csv-import');
openDialogCsvImport.mockImplementation(() => (...args) => last(args)());

describe('NewList', () => {
  let props;

  beforeEach(() => {
    props = {
      nameOfList: 'nameOfList',
      listNameValue: 'listNameValue',
      disabled: false,
      MUTATION_IMPORT_CSV: jest.fn(),
      data: {
        lists: [],
      },
      invalid: false,
      reset: () => {},
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<NewList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('when form submits calls openDialogCsvImport', () => {
    const wrapper = shallow(<NewList {...props} />);
    wrapper.simulate('submit', { preventDefault() {} });
    expect(openDialogCsvImport).toHaveBeenCalled();
  });

  it('when form submits calls reset', () => {
    const reset = jest.fn();
    const wrapper = shallow(<NewList {...props} reset={reset} />);
    wrapper.simulate('submit', { preventDefault() {} });
    expect(reset).toHaveBeenCalled();
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
