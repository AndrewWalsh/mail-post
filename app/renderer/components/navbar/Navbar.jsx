// @flow
import React from 'react';
import { MenuItem, MenuList } from 'material-ui/Menu';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { Link } from '../lib';

import {
  ROUTE_DASHBOARD,
  ROUTE_CAMPAIGNS,
  ROUTE_SETTINGS,
} from '../../constants';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const Navbar = () => (
  <MuiThemeProvider theme={theme}>
    <MenuList>
      <Link to={ROUTE_DASHBOARD}>
        <MenuItem>Dashboard</MenuItem>
      </Link>
      <Link to={ROUTE_CAMPAIGNS}>
        <MenuItem>Campaigns</MenuItem>
      </Link>
      <Link to={ROUTE_SETTINGS}>
        <MenuItem>Settings</MenuItem>
      </Link>
    </MenuList>
  </MuiThemeProvider>
);

export default Navbar;
