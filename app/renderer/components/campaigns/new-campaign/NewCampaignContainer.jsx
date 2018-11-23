import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { graphql, Mutation } from 'react-apollo';

import {
  FORM_NEW_CAMPAIGN,
  FORM_NEW_CAMPAIGN_NAME,
} from '../../../constants';
import {
  MUTATION_IMPORT_CSV,
  QUERY_GET_LISTS,
} from '../../../graphql';

import NewCampaign from './NewCampaign';

const NewCampaignContainer = ({ campaignNameValue, ...rest }) => (
  <Mutation mutation={MUTATION_IMPORT_CSV}>
    {(MUTATION_IMPORT_CSV_PROP, { loading }) => (
      <NewCampaign
        disabled={loading}
        MUTATION_NEW_CAMPAIGN={MUTATION_IMPORT_CSV_PROP}
        campaignNameValue={campaignNameValue}
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
});

export default compose(
  connect(mapStateToProps),
  graphql(QUERY_GET_LISTS, { options: { fetchPolicy: 'cache-and-network' } }),
  reduxForm({
    form: FORM_NEW_CAMPAIGN,
    destroyOnUnmount: false,
  }),
)(NewCampaignContainer);
