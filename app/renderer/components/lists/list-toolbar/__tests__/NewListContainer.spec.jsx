import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import configureStore from 'redux-mock-store';

import { FORM_NEW_LIST } from '../../../../constants';
import NewListContainer from '../NewListContainer';
import { apolloClient } from '../../../../utils';

import NewListWrapper from '../NewListWrapper';

const mockStore = configureStore();
const listNameValue = 'hello';
describe('NewListContainer', () => {
  let wrapper;
  let store;
  let state;

  beforeEach(() => {
    state = {
      form: {
        [FORM_NEW_LIST]: {
          values: {
            newList: 'hello',
          },
        },
      },
    };
    store = mockStore(state);
    wrapper = mount(
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <NewListContainer />
        </Provider>
      </ApolloProvider>,
    );
  });

  it('passes listNameValue and nameOfList from store to NewListWrapper', () => {
    const props = {
      listNameValue,
      nameOfList: 'newList',
    };

    expect(wrapper.find(NewListWrapper).props()).toEqual(expect.objectContaining(props));
  });
});
