import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const SettingsField = ({
  name,
  disabled,
  placeholder,
  ...rest
}) => (
  <Field
    name={name}
    component={TextField}
    placeholder={placeholder}
    disabled={disabled}
    {...rest}
  />
);

SettingsField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SettingsField;
