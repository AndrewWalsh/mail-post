import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { graphql, Mutation } from 'react-apollo';

import {
  FORM_NEW_CAMPAIGN,
  FORM_NEW_CAMPAIGN_NAME,
  FORM_NEW_CAMPAIGN_SUBJECT,
  FORM_NEW_CAMPAIGN_BODY,
  FORM_NEW_CAMPAIGN_LISTID,
} from '../../../constants';
import {
  MUTATION_CREATE_CAMPAIGN,
  QUERY_GET_LISTS,
} from '../../../graphql';

import NewCampaign from './NewCampaign';

const NewCampaignContainer = ({
  campaignNameValue,
  campaignSubjectValue,
  campaignBodyValue,
  campaignListIdValue,
  data,
  ...rest
}) => (
  <Mutation mutation={MUTATION_CREATE_CAMPAIGN}>
    {(MUTATION_CREATE_CAMPAIGN_PROP, { loading }) => (
      <NewCampaign
        disabled={loading}
        MUTATION_NEW_CAMPAIGN={MUTATION_CREATE_CAMPAIGN_PROP}
        campaignNameValue={campaignNameValue}
        campaignSubjectValue={campaignSubjectValue}
        campaignBodyValue={campaignBodyValue}
        campaignListIdValue={campaignListIdValue}
        lists={data.lists}
        {...rest}
      />
    )}
  </Mutation>
);

NewCampaignContainer.propTypes = {
  campaignNameValue: PropTypes.string.isRequired,
};

const selectForm = formValueSelector(FORM_NEW_CAMPAIGN);

const mapStateToProps = state => ({
  campaignNameValue: selectForm(state, FORM_NEW_CAMPAIGN_NAME) || '',
  campaignSubjectValue: selectForm(state, FORM_NEW_CAMPAIGN_SUBJECT) || '',
  campaignBodyValue: selectForm(state, FORM_NEW_CAMPAIGN_BODY) || '',
  campaignListIdValue: selectForm(state, FORM_NEW_CAMPAIGN_LISTID) || '',
});

export default compose(
  connect(mapStateToProps),
  graphql(QUERY_GET_LISTS, { options: { fetchPolicy: 'cache-and-network' } }),
  reduxForm({
    form: FORM_NEW_CAMPAIGN,
    destroyOnUnmount: false,
  }),
)(NewCampaignContainer);
