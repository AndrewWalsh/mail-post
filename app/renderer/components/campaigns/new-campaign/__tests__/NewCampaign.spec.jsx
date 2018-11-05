import React from 'react';
import { shallow } from 'enzyme';

import NewCampaign from '../NewCampaign';

describe('NewCampaign', () => {
  it('matches snapshot', async () => {
    const wrapper = shallow(<NewCampaign />);
    expect(wrapper).toMatchSnapshot();
  });
});
