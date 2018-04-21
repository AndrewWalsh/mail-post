import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const NewList = ({ ...props }) => (
  <Button
    type="submit"
    color="primary"
    data-test="import-csv"
    {...props}
  >
    <AddIcon />
    New List
  </Button>
);

export default NewList;
