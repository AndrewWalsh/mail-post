import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { graphql, Mutation } from 'react-apollo';

import {
  MUTATION_IMPORT_CSV,
  QUERY_GET_LISTS,
} from '../../../constants';

import ListTable from './ListTable';

const ListTableContainer = ({ data, ...rest }) => (
  <Mutation mutation={MUTATION_IMPORT_CSV}>
    {(MUTATION_IMPORT_CSV, { loading }) => (
      <ListTable
        data={data}
        MUTATION_IMPORT_CSV={MUTATION_IMPORT_CSV}
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
