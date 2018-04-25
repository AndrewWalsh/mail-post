import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';

// The numeric prop in material-ui determines padding
const columnData = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'total_subscribers',
    numeric: true,
    disablePadding: false,
    label: 'Subscribers',
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: 'Created',
  },
];

class EnhancedTableHead extends Component {
  constructor() {
    super();
    this.createSortHandler = this.createSortHandler.bind(this);
  }

  createSortHandler(property) {
    return event => this.props.onRequestSort(event, property);
  }

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => (
            <TableCell
              key={column.id}
              numeric={column.numeric}
              padding={column.disablePadding ? 'none' : 'dense'}
              sortDirection={orderBy === column.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
            ), this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
