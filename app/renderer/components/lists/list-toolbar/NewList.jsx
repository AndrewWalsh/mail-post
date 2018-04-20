import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import openDialogCsvImport from './open-dialog-csv-import';

import NewListButton from './NewListButton';

const onSubmit = (e, listNameValue, callback) => {
  e.preventDefault();
  const callbackFormat = csvPath => callback({
    variables: {
      csvPath,
      name: listNameValue,
    },
  });
  openDialogCsvImport(callbackFormat);
};

const NewList = ({
  nameOfList,
  listNameValue,
  mutationCreateListCsv,
  disabled,
}) => (
  <form onSubmit={e => !disabled && onSubmit(e, listNameValue, mutationCreateListCsv)}>
    <Field name={nameOfList} component={TextField} placeholder="List name" disabled={disabled} />
    <NewListButton disabled={disabled} />
  </form>
);

NewList.propTypes = {
  mutationCreateListCsv: PropTypes.func.isRequired,
  nameOfList: PropTypes.string.isRequired,
  listNameValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default NewList;
