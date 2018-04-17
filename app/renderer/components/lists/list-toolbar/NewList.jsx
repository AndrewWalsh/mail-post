import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import openDialogCsvImport from './open-dialog-csv-import';

import NewListButton from './NewListButton';

const onSubmit = (e, listNameValue) => {
  e.preventDefault();
  openDialogCsvImport(listNameValue);
};

const NewList = ({ nameOfList, listNameValue }) => (
  <form onSubmit={e => onSubmit(e, listNameValue)}>
    <Field name={nameOfList} component={TextField} placeholder="List name" />
    <NewListButton />
  </form>
);

NewList.propTypes = {
  nameOfList: PropTypes.string.isRequired,
  listNameValue: PropTypes.string.isRequired,
};

export default NewList;
