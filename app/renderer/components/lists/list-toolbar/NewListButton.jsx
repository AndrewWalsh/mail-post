import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const NewList = props => (
  <Button
    type="submit"
    color="primary"
    data-test="import-csv"
    {...props}
  >
    <AddIcon />
    Import
  </Button>
);

export default NewList;
