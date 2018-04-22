import React from 'react';
import PropTypes from 'prop-types';

import { QueryGetAllLists } from '../../../constants';
import openDialogCsvImport from './open-dialog-csv-import';

import NewListNameField from './NewListNameField';
import NewListButton from './NewListButton';

const onSubmit = (e, listNameValue, callback, reset) => {
  e.preventDefault();
  const callbackFormat = csvPath => callback({
    variables: {
      csvPath,
      name: listNameValue,
    },
    update: (store, { data: { importCsv } }) => {
      const data = store.readQuery({ query: QueryGetAllLists });
      data.lists.push(importCsv);
      store.writeQuery({ query: QueryGetAllLists, data });
    },
  });
  openDialogCsvImport(callbackFormat);
  reset();
};

const buttonIsDisabled = (disabled, invalid, listNameValue) =>
  disabled || invalid || listNameValue === '';

const NewList = ({
  data,
  nameOfList,
  listNameValue,
  mutationCreateListCsv,
  disabled,
  invalid,
  reset,
}) => (
  <form onSubmit={e => !disabled && onSubmit(e, listNameValue, mutationCreateListCsv, reset)}>
    <NewListNameField
      lists={data.lists}
      name={nameOfList}
      disabled={disabled}
    />
    <NewListButton disabled={buttonIsDisabled(disabled, invalid, listNameValue)} />
  </form>
);

NewList.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  mutationCreateListCsv: PropTypes.func.isRequired,
  nameOfList: PropTypes.string.isRequired,
  listNameValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
};

export default NewList;
