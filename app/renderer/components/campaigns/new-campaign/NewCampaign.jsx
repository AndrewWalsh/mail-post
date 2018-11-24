import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Select } from 'redux-form-material-ui';
import MenuItem from '@material-ui/core/MenuItem';

import {
  FORM_NEW_CAMPAIGN_NAME,
  FORM_NEW_CAMPAIGN_SUBJECT,
  FORM_NEW_CAMPAIGN_BODY,
  FORM_NEW_CAMPAIGN_LISTID,
} from '../../../constants';
import PaperField from '../../lib/PaperField';
import NewCampaignButton from './NewCampaignButton';
import { generateCreateCampaign } from '../../../graphql';

// /*{disabled, MUTATION_NEW_CAMPAIGN, campaignNameValue,}*/

const onSubmit = (e, args, mutation, reset) => {
  e.preventDefault();
  mutation(generateCreateCampaign(args));
  reset();
};

const buttonIsDisabled = (disabled, invalid) => disabled || invalid;

const NewCampaignForm = ({
  invalid,
  disabled,
  reset,
  lists,
  campaignNameValue,
  campaignSubjectValue,
  campaignBodyValue,
  campaignListIdValue,
  MUTATION_NEW_CAMPAIGN,
}) => (
  <form onSubmit={e => !disabled && onSubmit(e, {
    name: campaignNameValue,
    subject: campaignSubjectValue,
    body: campaignBodyValue,
    listId: campaignListIdValue,
  }, MUTATION_NEW_CAMPAIGN, reset)}
  >
    <PaperField
      label="Campaign Name"
      name={FORM_NEW_CAMPAIGN_NAME}
      component={TextField}
      placeholder="A name that identifies this campaign"
      fullWidth
    />

    <PaperField
      label="Subject"
      name={FORM_NEW_CAMPAIGN_SUBJECT}
      component={TextField}
      placeholder="Subject of the email"
      fullWidth
    />

    <PaperField
      label="Body"
      name={FORM_NEW_CAMPAIGN_BODY}
      component="textarea"
      placeholder="Body of the email"
      style={{ width: '100%', height: '25vh' }}
    />

    <PaperField
      label="List"
      name={FORM_NEW_CAMPAIGN_LISTID}
      component={Select}
      placeholder="Which list to send this campaign to"
      fullWidth
    >
      {lists && lists.map(({ id, name }) => (
        <MenuItem
          value={id}
          key={id}
        >
          {name}
        </MenuItem>
      ))}
    </PaperField>

    <NewCampaignButton disabled={buttonIsDisabled(disabled, invalid)} />
  </form>
);

NewCampaignForm.propTypes = {
  lists: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  invalid: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,

  campaignNameValue: PropTypes.string.isRequired,
  campaignSubjectValue: PropTypes.string.isRequired,
  campaignBodyValue: PropTypes.string.isRequired,
  campaignListIdValue: PropTypes.string.isRequired,

  MUTATION_NEW_CAMPAIGN: PropTypes.func.isRequired,
};

export default NewCampaignForm;
