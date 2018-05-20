import React from 'react';
import { shallow } from 'enzyme';

import NewCampaignForm from '../NewCampaignForm';

describe('NewCampaignForm', () => {
  it('matches snapshot', async () => {
    const wrapper = shallow(<NewCampaignForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
