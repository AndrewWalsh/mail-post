import React from 'react';
import { shallow } from 'enzyme';
import MaterialSnackbar from 'material-ui/Snackbar';

import Snackbar from '../Snackbar';

const props = {
  id: 'an id',
  message: 'hello',
}

describe('Snackbar', () => {
  it('renders a material ui snackbar', async () => {
    const wrapper = shallow(<Snackbar {...props} />);
    expect(wrapper.find(MaterialSnackbar).exists()).toBe(true);
  });

  it('matches snapshot', async () => {
    const wrapper = shallow(<Snackbar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
