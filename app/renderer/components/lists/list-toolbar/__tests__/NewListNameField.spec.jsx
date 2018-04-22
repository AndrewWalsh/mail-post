import React from 'react';
import { shallow } from 'enzyme';

import NewListNameField from '../NewListNameField';
import { toBuffer } from 'ip';

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
describe('NewListNameField', () => {
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
});
