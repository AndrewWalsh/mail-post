import React from 'react';
// import PropTypes from 'prop-types';
import { TextField } from 'redux-form-material-ui';

import {
  FORM_NEW_CAMPAIGN_NAME,
  FORM_NEW_CAMPAIGN_SUBJECT,
  FORM_NEW_CAMPAIGN_BODY,
  FORM_NEW_CAMPAIGN_LISTID,
} from '../../../constants';
import PaperField from '../../lib/PaperField';

// /*{disabled, MUTATION_NEW_CAMPAIGN, campaignNameValue,}*/

const NewCampaignForm = () => (
  <form>
    <PaperField
      label="Campaign Name"
      name={FORM_NEW_CAMPAIGN_NAME}
      component={TextField}
      placeholder="A name that identifies this campaign"
    />

    <PaperField
      label="Subject"
      name={FORM_NEW_CAMPAIGN_SUBJECT}
      component={TextField}
      placeholder="Subject of the email"
    />

    <PaperField
      label="Body"
      name={FORM_NEW_CAMPAIGN_BODY}
      component={TextField}
      placeholder="Body of the email"
    />

    <PaperField
      label="List"
      name={FORM_NEW_CAMPAIGN_LISTID}
      component={TextField}
      placeholder="Which list to send this campaign to"
    />
  </form>
);

// NewCampaignForm.propTypes = {
//   disabled: PropTypes.bool.isRequired,
//   MUTATION_NEW_CAMPAIGN: PropTypes.func.isRequired,
//   campaignNameValue: PropTypes.string.isRequired,
// };

export default NewCampaignForm;
