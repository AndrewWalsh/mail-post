import React from 'react';
import { shallow } from 'enzyme';

import NewCampaignFormWrapper from '../NewCampaignFormWrapper';

describe('NewCampaignFormWrapper', () => {
  it('matches snapshot', async () => {
    const wrapper = shallow(<NewCampaignFormWrapper />);
    expect(wrapper).toMatchSnapshot();
  });
});
