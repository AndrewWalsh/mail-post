import React from 'react';
import { shallow } from 'enzyme';

import NewCampaignFormName from '../NewCampaignFormName';

describe('NewCampaignFormName', () => {
  it('matches snapshot', async () => {
    const wrapper = shallow(<NewCampaignFormName />);
    expect(wrapper).toMatchSnapshot();
  });
});
