import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { graphql, Mutation } from 'react-apollo';
import ReactRouterPropTypes from 'react-router-prop-types';

import SendCampaign from './SendCampaign';

import {
  MUTATION_DELETE_CAMPAIGNS,
  QUERY_GET_CAMPAIGNS,
} from '../../../graphql';

const SendCampaignContainer = ({ data, match: { params: { campaignName }} }) => {
  const campaign = data.campaigns.find(c => c.name === campaignName);
  if (!campaign) return <div />;
  return (
    <Mutation mutation={MUTATION_DELETE_CAMPAIGNS}>
      {MUTATION_DELETE_CAMPAIGNS_PROP => (
        <SendCampaign campaign={campaign} />
      )}
    </Mutation>
  )
};

SendCampaignContainer.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: ReactRouterPropTypes.match.isRequired,
};

export default compose(
  graphql(QUERY_GET_CAMPAIGNS, { options: { fetchPolicy: 'cache-and-network' } }),
)(SendCampaignContainer);
