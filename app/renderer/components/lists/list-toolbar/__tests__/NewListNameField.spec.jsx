import React from 'react';
import td from 'testdouble';
import { shallow } from 'enzyme';

require('testdouble-jest')(td, jest);

const props = {
  name: 'howdy',
  disabled: false,
  anotherProp: 'hi',
  lists: [
    {
      id: 1,
      name: 'hi',
    },
    {
      id: 2,
      name: 'ho',
    },
    {
      id: 1,
      name: 'hum',
    },
  ],
};
let NewListNameField;
let newListHelpers;
describe('NewListNameField', () => {
  beforeEach(() => {
    newListHelpers = td.replace('../new-list-helpers', {
      validateName: td.function(),
    });
    NewListNameField = require('../NewListNameField');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<NewListNameField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('passes props', () => {
    const wrapper = shallow(<NewListNameField {...props} />);
    const passedProps = {
      name: props.name,
      anotherProp: props.anotherProp,
      disabled: props.disabled,
    };
    expect(wrapper.props()).toEqual(expect.objectContaining(passedProps));
  });

  it('when validate is called, validateName is called with spread args', () => {
    const exampleArgs = ['a', 'b', 'c'];
    const wrapper = shallow(<NewListNameField {...props} />);
    wrapper.prop('validate')(...exampleArgs);
    td.verify(newListHelpers.validateName(props.lists, ...exampleArgs));
  });
});
