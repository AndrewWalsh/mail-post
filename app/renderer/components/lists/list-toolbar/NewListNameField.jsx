import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { validateName } from './new-list-helpers';

const NewListNameField = ({
  name,
  disabled,
  lists,
  ...rest
}) => (
  <Field
    name={name}
    component={TextField}
    placeholder="List name"
    disabled={disabled}
    validate={(...args) => validateName(lists, ...args)}
    {...rest}
  />
);

NewListNameField.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewListNameField;
