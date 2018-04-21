import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { graphql, Mutation } from 'react-apollo';

import {
  MutationCreateListCsv,
  QueryGetAllLists,
} from '../../../constants';

import ListTable from './ListTable';

const ListTableContainer = ({ data, ...rest }) => (
  <Mutation mutation={MutationCreateListCsv}>
    {(mutationCreateListCsv, { loading }) => (
      <ListTable
        data={data}
        mutationCreateListCsv={mutationCreateListCsv}
        {...rest}
      />
    )}
  </Mutation>
);

ListTableContainer.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default compose(
  graphql(QueryGetAllLists),
)(ListTableContainer);
