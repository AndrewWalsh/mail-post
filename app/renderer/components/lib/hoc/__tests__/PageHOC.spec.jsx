import React from 'react';
import { shallow } from 'enzyme';

import PageHOC from '../PageHOC';

describe('PageHOC', () => {
  it('snapshot', async () => {
    const wrapper = shallow(<PageHOC />);
    expect(wrapper).toMatchSnapshot();
  });
});
