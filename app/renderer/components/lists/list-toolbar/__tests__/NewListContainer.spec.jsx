import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import configureStore from 'redux-mock-store';

import { FORM_NEW_LIST } from '../../../../constants';
import {
  MUTATION_IMPORT_CSV,
  QUERY_GET_LISTS,
} from '../../../../graphql';
import NewListContainer from '../NewListContainer';
import { apolloClient } from '../../../../utils';

import NewListWrapper from '../NewListWrapper';

describe('NewListContainer', () => {
  const mockStore = configureStore();
  const listNameValue = 'hello';
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

  it('Query hoc\'s fetch policy is "cache-and-network"', () => {
    expect(wrapper.find(Query).prop('fetchPolicy')).toEqual('cache-and-network');
  });

  it('Query hoc\'s query is QUERY_GET_LISTS', () => {
    expect(wrapper.find(Query).prop('query')).toEqual(QUERY_GET_LISTS);
  });

  it('Query hoc passes data to NewListWrapper', () => {
    const queryData = wrapper.find(Query).childAt(0).prop('data');
    const newListWrapperData = wrapper.find(NewListWrapper).prop('data');
    expect(queryData).toEqual(newListWrapperData);
  });

  it('ReduxForm hoc passes props to NewListWrapper', () => {
    const reduxFormProps = wrapper.find('ReduxForm').props();
    const newListWrapperData = wrapper.find(NewListWrapper).props();
    expect(newListWrapperData).toEqual(expect.objectContaining(reduxFormProps));
  });

  it('Mutation component mutation is MUTATION_IMPORT_CSV', () => {
    const mutation = wrapper.find(Mutation).prop('mutation');
    expect(mutation).toEqual(MUTATION_IMPORT_CSV);
  });
});
