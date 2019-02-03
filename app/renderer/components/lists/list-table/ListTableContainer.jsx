import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { graphql, Mutation } from 'react-apollo';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';

import {
  MUTATION_DELETE_LISTS,
  QUERY_GET_LISTS,
  generateDeleteLists,
} from '../../../graphql';

import { Table } from '../../lib';

const formatTime = lists => lists.map(({ createdAt, ...rest }) => ({
  ...rest,
  createdAt: new Date(createdAt).getTime(),
}));

const columnData = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'total_subscribers',
    numeric: true,
    disablePadding: false,
    label: 'Subscribers',
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: 'Created',
  },
];

const ListTableContainer = ({ data, ...rest }) => (
  <Mutation mutation={MUTATION_DELETE_LISTS}>
    {MUTATION_DELETE_LISTS_PROP => (
      <Table
        data={formatTime(data.lists)}
        deleteItem={selected => MUTATION_DELETE_LISTS_PROP(generateDeleteLists(selected))}
        columnData={columnData}
        title="Lists"
        {...rest}
      >
        {n => (
          <Fragment>
            <TableCell padding="none">{n.name}</TableCell>
            <TableCell numeric>{n.total_subscribers}</TableCell>
            <TableCell numeric>{moment(n.createdAt).add(24, 'hours').format('LLL')}</TableCell>
          </Fragment>
        )}
      </Table>
    )}
  </Mutation>
);

ListTableContainer.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default compose(
  graphql(QUERY_GET_LISTS, { options: { fetchPolicy: 'cache-and-network' } }),
)(ListTableContainer);
