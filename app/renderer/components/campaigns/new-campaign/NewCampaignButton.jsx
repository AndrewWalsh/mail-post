import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const NewCampaignButton = props => (
  <Button
    type="submit"
    color="primary"
    data-test="new-campaign"
    {...props}
  >
    <AddIcon />
    Create Campaign
  </Button>
);

export default NewCampaignButton;
