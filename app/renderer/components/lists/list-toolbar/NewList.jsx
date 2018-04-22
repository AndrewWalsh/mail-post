import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { QUERY_GET_LISTS } from '../../../constants';
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
      const data = store.readQuery({ query: QUERY_GET_LISTS });
      data.lists.push(importCsv);
      store.writeQuery({ query: QUERY_GET_LISTS, data });
    },
  });
  openDialogCsvImport(callbackFormat);
  reset();
};

const buttonIsDisabled = (disabled, invalid, listNameValue) =>
  disabled || invalid || listNameValue === '';

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledFieldWrapper = styled.div`
  width: 100%;
  margin-right: 1em;
`;

const NewList = ({
  data,
  nameOfList,
  listNameValue,
  MUTATION_IMPORT_CSV,
  disabled,
  invalid,
  reset,
}) => (
  <StyledForm onSubmit={e => !disabled && onSubmit(e, listNameValue, MUTATION_IMPORT_CSV, reset)}>
    <StyledFieldWrapper>
      <NewListNameField
        lists={data.lists}
        name={nameOfList}
        disabled={disabled}
        fullWidth
      />
    </StyledFieldWrapper>
    <NewListButton disabled={buttonIsDisabled(disabled, invalid, listNameValue)} />
  </StyledForm>
);

NewList.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  MUTATION_IMPORT_CSV: PropTypes.func.isRequired,
  nameOfList: PropTypes.string.isRequired,
  listNameValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
};

export default NewList;
