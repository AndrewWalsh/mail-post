import React from 'react';
import { shallow } from 'enzyme';

import SnackbarContainer from '../SnackbarContainer';
import Snackbar from '../../../components/lib/Snackbar';

const WrappedSnackbarContainer = SnackbarContainer.WrappedComponent;

describe('SnackbarContainer', () => {
  it('renders a Snackbar and passes props', async () => {
    const props = {
      message: 'hello',
      id: 'an id',
      anotherProp: 'there',
    };
    const wrapper = shallow(<WrappedSnackbarContainer {...props} />);
    expect(wrapper.find(Snackbar).props()).toEqual(props);
  });
});
