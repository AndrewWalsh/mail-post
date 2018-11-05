import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

class EnhancedTableHead extends Component {
  constructor() {
    super();
    this.createSortHandler = this.createSortHandler.bind(this);
  }

  createSortHandler(property) {
    return e => this.props.onRequestSort(e, property);
  }

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      columnData,
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
  columnData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    numeric: PropTypes.bool.isRequired,
    disablePadding: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default EnhancedTableHead;
