import React from 'react';
import { shallow } from 'enzyme';
import NewListNameField from '../NewListNameField';
import * as newListHelpers from '../new-list-helpers';

jest.mock('../new-list-helpers');

describe('NewListNameField', () => {
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
    expect(newListHelpers.validateName).toHaveBeenCalledWith(props.lists, ...exampleArgs);
  });
});
