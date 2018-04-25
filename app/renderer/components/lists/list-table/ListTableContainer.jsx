import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { graphql, Mutation } from 'react-apollo';

import {
  MUTATION_DELETE_LISTS,
  QUERY_GET_LISTS,
} from '../../../graphql';

import ListTable from './ListTable';

const ListTableContainer = ({ data, ...rest }) => (
  <Mutation mutation={MUTATION_DELETE_LISTS}>
    {(MUTATION_DELETE_LISTS_PROP, { loading }) => (
      <ListTable
        data={data}
        MUTATION_DELETE_LISTS={MUTATION_DELETE_LISTS_PROP}
        {...rest}
      />
    )}
  </Mutation>
);

ListTableContainer.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default compose(
  graphql(QUERY_GET_LISTS, { options: { fetchPolicy: 'cache-and-network' } }),
)(ListTableContainer);
