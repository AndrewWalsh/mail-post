import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { FORM_NEW_CAMPAIGN } from '../../../constants';

const NewCampaignFormName = () => <Field name="username" component={TextField} placeholder="Street" />;

export default reduxForm({
  form: FORM_NEW_CAMPAIGN,
})(NewCampaignFormName);
