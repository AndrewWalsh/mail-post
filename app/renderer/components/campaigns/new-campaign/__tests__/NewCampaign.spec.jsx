import React from 'react';
import { shallow } from 'enzyme';

import NewCampaign from '../NewCampaign';

describe('NewCampaign', () => {
  it('renders elements', async () => {
    const wrapper = shallow(<NewCampaign />);
    expect(wrapper).toMatchSnapshot();
  });
});
