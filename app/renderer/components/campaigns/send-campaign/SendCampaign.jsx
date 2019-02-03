import React from 'react';
import PropTypes from 'prop-types';

const SendCampaign = () => (
  <p>
    hi
  </p>
);

SendCampaign.propTypes = {
  campaign: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
}

export default SendCampaign;
