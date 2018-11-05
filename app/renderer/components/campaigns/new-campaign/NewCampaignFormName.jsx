import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import {
  FORM_NEW_CAMPAIGN,
  FORM_NEW_CAMPAIGN_NAME,
} from '../../../constants';

const NewCampaignFormName = () => (
  <Field
    label="Campaign Name"
    name={FORM_NEW_CAMPAIGN_NAME}
    component={TextField}
    placeholder="A name that identifies this campaign"
    fullWidth
  />
);

export default reduxForm({
  form: FORM_NEW_CAMPAIGN,
})(NewCampaignFormName);
