import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table, {
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment';
import { clone } from 'ramda';

import sort from './sort-data';
import { generateDeleteLists } from '../../../graphql';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';

class EnhancedTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'desc',
      orderBy: 'createdAt',
      selected: [],
      data: props.data && props.data.lists ? props.data.lists : [],
      page: 0,
      rowsPerPage: 5,
    };

    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      const lists = clone(nextProps.data.lists).map(({ createdAt, ...rest }) => ({
        ...rest,
        createdAt: new Date(createdAt).getTime(),
      }));
      const { data } = sort(lists, this.state.order, this.state.orderBy);
      this.setState({ data });
    }
  }

  handleRequestSort(event, property) {
    const { data, order } = sort(this.state.data, this.state.order, this.state.orderBy, property);
    this.setState({ data, order, orderBy: property });
  }

  handleSelectAllClick(event, checked) {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  }

  handleClick(event, id) {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  }

  handleChangePage(event, page) {
    this.setState({ page });
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  }

  isSelected(id) {
    return this.state.selected.indexOf(id) !== -1;
  }

  handleDelete() {
    const { selected } = this.state;
    this.props.MUTATION_DELETE_LISTS(generateDeleteLists(selected));
    this.setState({ selected: [] });
  }

  render() {
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
    } = this.state;
    return (
      <Paper>
        <TableToolbar
          numSelected={selected.length}
          onClickDelete={this.handleDelete}
        />
        <div>
          <Table>
            <TableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((n) => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell padding="none">{n.name}</TableCell>
                    <TableCell numeric>{n.total_subscribers}</TableCell>
                    <TableCell numeric>{moment(n.createdAt).add(24, 'hours').format('LLL')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  MUTATION_DELETE_LISTS: PropTypes.func.isRequired,
};

export default EnhancedTable;
