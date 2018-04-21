import React from 'react';
import { shallow } from 'enzyme';

import NewListContainer from '../NewListContainer';

const WrappedNewListContainer = NewListContainer.WrappedComponent;

const listNameValue = 'hello';
const newListName = 'hi';
const props = { listNameValue, newListName };
describe('NewListContainer', () => {
  it('passes props', () => {
    const wrapper = shallow(<WrappedNewListContainer {...props} />);
    expect(wrapper.prop('listNameValue')).toEqual(listNameValue);
    expect(wrapper.prop('newListName')).toEqual(newListName);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<WrappedNewListContainer {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
