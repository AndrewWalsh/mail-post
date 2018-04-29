import React from 'react';
import { mount } from 'enzyme';
import { ApolloProvider, Query } from 'react-apollo';

import ListTableContainer from '../ListTableContainer';
import { apolloClient } from '../../../../utils';

describe('ListTableContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ApolloProvider client={apolloClient}>
        <ListTableContainer />
      </ApolloProvider>,
    );
  });

  it('Query hoc\'s fetch policy is "cache-and-network"', () => {
    expect(wrapper.find(Query).prop('fetchPolicy')).toEqual('cache-and-network');
  });
});
