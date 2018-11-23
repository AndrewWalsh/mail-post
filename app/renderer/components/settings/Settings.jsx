import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SettingsField from './SettingsField';
import { generateUpdateSettings } from '../../graphql';

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledFieldWrapper = styled.div`
  width: 100%;
  margin-right: 1em;
`;

const updateField = (e, mutation, key, value) => {
  mutation(generateUpdateSettings({ [key]: value }));
  return value;
};

export default class Settings extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, newValue, prevValue, fieldName) {
    const { MUTATION_UPDATE_SETTINGS } = this.props;
    return updateField(e, MUTATION_UPDATE_SETTINGS, fieldName, newValue);
  }

  render() {
    const {
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
      MUTATION_UPDATE_SETTINGS,
      disabled,
      ...rest
    } = this.props;
    return (
      <StyledForm {...rest}>
        <StyledFieldWrapper>
          <SettingsField
            name={amazonSESkeyName}
            disabled={disabled}
            placeholder="Amazon SES key"
            onChange={this.handleSubmit}
            fullWidth
          />

          <SettingsField
            name={amazonSESSecretKeyName}
            disabled={disabled}
            placeholder="Amazon secret SES key"
            onChange={this.handleSubmit}
            fullWidth
          />

          <SettingsField
            name={amazonRegionName}
            disabled={disabled}
            placeholder="Amazon region"
            onChange={this.handleSubmit}
            fullWidth
          />

          <SettingsField
            name={amazonWhiteLabelUrlName}
            disabled={disabled}
            placeholder="Amazon white label url"
            onChange={this.handleSubmit}
            fullWidth
          />

          <SettingsField
            name={amazonEmailName}
            disabled={disabled}
            placeholder="Amazon email"
            onChange={this.handleSubmit}
            fullWidth
          />
        </StyledFieldWrapper>
      </StyledForm>
    );
  }
}

Settings.propTypes = {
  amazonSESkeyName: PropTypes.string.isRequired,
  amazonSESSecretKeyName: PropTypes.string.isRequired,
  amazonRegionName: PropTypes.string.isRequired,
  amazonWhiteLabelUrlName: PropTypes.string.isRequired,
  amazonEmailName: PropTypes.string.isRequired,

  amazonSESkeyValue: PropTypes.string.isRequired,
  amazonSESSecretKeyValue: PropTypes.string.isRequired,
  amazonRegionValue: PropTypes.string.isRequired,
  amazonWhiteLabelUrlValue: PropTypes.string.isRequired,
  amazonEmailValue: PropTypes.string.isRequired,

  MUTATION_UPDATE_SETTINGS: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
