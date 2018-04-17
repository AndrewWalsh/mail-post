import React from 'react';
import { shallow } from 'enzyme';

import SnackbarContainer from '../SnackbarContainer';
import Snackbar from '../Snackbar';

const WrappedSnackbarContainer = SnackbarContainer.WrappedComponent;

describe('SnackbarContainer', () => {
  it('renders a Snackbar and passes props', async () => {
    const props = {
      id: 'hello',
      message: 'hello',
      anotherProp: 'there',
    };
    const wrapper = shallow(<WrappedSnackbarContainer {...props} />);
    expect(wrapper.find(Snackbar).props()).toEqual(props);
  });
});
