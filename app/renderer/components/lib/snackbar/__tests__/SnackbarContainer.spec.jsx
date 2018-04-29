import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SnackbarContainer from '../SnackbarContainer';

describe('SnackbarContainer', () => {
  const mockStore = configureStore();
  let wrapper;
  let store;
  let state;

  beforeEach(() => {
    state = {
      notification: {
        id: 'hello',
        message: 'hello',
      },
    };
    store = mockStore(state);
    wrapper = shallow(<SnackbarContainer store={store} />);
  });

  it('renders a Snackbar and passes props', async () => {
    const props = {
      id: state.notification.id,
      message: state.notification.message,
    };
    expect(wrapper.dive().props()).toEqual(expect.objectContaining(props));
  });
});
