import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { graphql } from 'react-apollo';

import { FORM_SETTINGS } from '../../constants';
import { QUERY_GET_SETTINGS } from '../../graphql';

import Settings from './Settings';

const nameOfAmazonSESkeyValue = 'amazonSESkey';
const nameOfAmazonSESSecretKeyValue = 'amazonSESSecretKey';
const nameOfAmazonRegionValue = 'amazonRegion';
const nameOfAmazonWhiteLabelUrlValue = 'amazonWhiteLabelUrl';
const nameOfAmazonEmailValue = 'amazonEmail';

const SettingsContainer = ({
  MUTATION_UPDATE_SETTINGS,
  disabled,

  amazonSESkeyName,
  amazonSESSecretKeyName,
  amazonRegionName,
  amazonWhiteLabelUrlName,
  amazonEmailName,

  amazonSESkeyValue,
  amazonSESSecretKeyValue,
  amazonRegionValue,
  amazonWhiteLabelUrlValue,
  amazonEmailValue,
  ...rest
}) => (
  <Settings
    MUTATION_UPDATE_SETTINGS={MUTATION_UPDATE_SETTINGS}
    disabled={disabled}
    amazonSESkeyName={amazonSESkeyName}
    amazonSESSecretKeyName={amazonSESSecretKeyName}
    amazonRegionName={amazonRegionName}
    amazonWhiteLabelUrlName={amazonWhiteLabelUrlName}
    amazonEmailName={amazonEmailName}

    amazonSESkeyValue={amazonSESkeyValue}
    amazonSESSecretKeyValue={amazonSESSecretKeyValue}
    amazonRegionValue={amazonRegionValue}
    amazonWhiteLabelUrlValue={amazonWhiteLabelUrlValue}
    amazonEmailValue={amazonEmailValue}
    {...rest}
  />
);

SettingsContainer.propTypes = {
  MUTATION_UPDATE_SETTINGS: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,

  amazonSESkeyName: PropTypes.string,
  amazonSESSecretKeyName: PropTypes.string,
  amazonRegionName: PropTypes.string,
  amazonWhiteLabelUrlName: PropTypes.string,
  amazonEmailName: PropTypes.string,

  amazonSESkeyValue: PropTypes.string.isRequired,
  amazonSESSecretKeyValue: PropTypes.string.isRequired,
  amazonRegionValue: PropTypes.string.isRequired,
  amazonWhiteLabelUrlValue: PropTypes.string.isRequired,
  amazonEmailValue: PropTypes.string.isRequired,
};

SettingsContainer.defaultProps = {
  amazonSESkeyName: nameOfAmazonSESkeyValue,
  amazonSESSecretKeyName: nameOfAmazonSESSecretKeyValue,
  amazonRegionName: nameOfAmazonRegionValue,
  amazonWhiteLabelUrlName: nameOfAmazonWhiteLabelUrlValue,
  amazonEmailName: nameOfAmazonEmailValue,
};

const selectForm = formValueSelector(FORM_SETTINGS);

const mapStateToProps = state => ({
  amazonSESkeyValue: selectForm(state, nameOfAmazonSESkeyValue) || '',
  amazonSESSecretKeyValue: selectForm(state, nameOfAmazonSESSecretKeyValue) || '',
  amazonRegionValue: selectForm(state, nameOfAmazonRegionValue) || '',
  amazonWhiteLabelUrlValue: selectForm(state, nameOfAmazonWhiteLabelUrlValue) || '',
  amazonEmailValue: selectForm(state, nameOfAmazonEmailValue) || '',
});

export default compose(
  connect(mapStateToProps),
  graphql(QUERY_GET_SETTINGS, { options: { fetchPolicy: 'cache-and-network' } }),
  reduxForm({
    form: FORM_SETTINGS,
    destroyOnUnmount: false,
  }),
)(SettingsContainer);
