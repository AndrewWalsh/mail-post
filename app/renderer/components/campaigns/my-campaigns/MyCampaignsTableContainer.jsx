import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { graphql, Mutation } from 'react-apollo';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';

import Link from '../../lib/Link';

import {
  MUTATION_DELETE_CAMPAIGNS,
  QUERY_GET_CAMPAIGNS,
  generateDeleteCampaigns,
} from '../../../graphql';

import { Table } from '../../lib';

const formatTime = campaigns => campaigns.map(({ createdAt, ...rest }) => ({
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
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: 'Created',
  },
];

const MyCampaignsTableContainer = ({ data, ...rest }) => (
  <Mutation mutation={MUTATION_DELETE_CAMPAIGNS}>
    {MUTATION_DELETE_CAMPAIGNS_PROP => (
      <Table
        data={formatTime(data.campaigns)}
        deleteItem={selected => MUTATION_DELETE_CAMPAIGNS_PROP(generateDeleteCampaigns(selected))}
        columnData={columnData}
        title="Campaigns"
        {...rest}
      >
        {n => (
          <Fragment>
            <TableCell padding="none">
              <Link to={`/campaign/${n.name}`}>{n.name}</Link>
            </TableCell>
            <TableCell numeric>{moment(n.createdAt).add(24, 'hours').format('LLL')}</TableCell>
          </Fragment>
        )}
      </Table>
    )}
  </Mutation>
);

MyCampaignsTableContainer.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default compose(
  graphql(QUERY_GET_CAMPAIGNS, { options: { fetchPolicy: 'cache-and-network' } }),
)(MyCampaignsTableContainer);
