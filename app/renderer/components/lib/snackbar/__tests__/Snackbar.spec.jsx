import React from 'react';
import { mount } from 'enzyme';
import IconButton from 'material-ui/IconButton';
import MaterialSnackbar from 'material-ui/Snackbar';

import Snackbar from '../Snackbar';

const props = {
  id: 'an id',
  message: 'hello',
}

describe('Snackbar', () => {
  it('matches snapshot', async () => {
    const wrapper = mount(<Snackbar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('is closed on mount', async () => {
    const wrapper = mount(<Snackbar {...props} />);
    expect(wrapper.find(MaterialSnackbar).prop('open')).toBe(false);
  });

  it('when passed a new message and id, renders the snackbar', async () => {
    const newMessage = {
      id: 'unique',
      message: 'test',
    };
    const wrapper = mount(<Snackbar {...props} />);
    wrapper.setProps(newMessage);
    expect(wrapper.find(MaterialSnackbar).prop('open')).toBe(true);
  });

  it('when close button is clicked, the snackbar closes', async () => {
    const newMessage = {
      id: 'unique',
      message: 'test',
    };
    const wrapper = mount(<Snackbar {...props} />);
    wrapper.setProps(newMessage);
    wrapper.find(IconButton).simulate('click');
    expect(wrapper.find(MaterialSnackbar).prop('open')).toBe(false);
  });
});
