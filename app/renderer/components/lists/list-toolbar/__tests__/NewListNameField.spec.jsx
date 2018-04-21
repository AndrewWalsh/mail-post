import React from 'react';
import { shallow } from 'enzyme';

import NewListNameField from '../NewListNameField';

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
    expect(wrapper.prop('name')).toEqual(props.name);
    expect(wrapper.prop('disabled')).toEqual(props.disabled);
    expect(wrapper.prop('anotherProp')).toEqual(props.anotherProp);
  });
});
