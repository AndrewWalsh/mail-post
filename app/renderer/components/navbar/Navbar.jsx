import React from 'react';
import { MenuItem, MenuList } from 'material-ui/Menu';
import { Link } from '../lib';

import {
  ROUTE_DASHBOARD,
  ROUTE_CAMPAIGNS,
  ROUTE_SETTINGS,
  ROUTE_LISTS,
} from '../../constants';

const Navbar = () => (
  <MenuList>y
    <Link to={ROUTE_DASHBOARD} data-test="nav-dashboard">
      <MenuItem>Dashboard</MenuItem>
    </Link>
    <Link to={ROUTE_CAMPAIGNS} data-test="nav-campaigns">
      <MenuItem>Campaigns</MenuItem>
    </Link>
    <Link to={ROUTE_LISTS} data-test="nav-lists">
      <MenuItem>Lists</MenuItem>
    </Link>
    <Link to={ROUTE_SETTINGS} data-test="nav-settings">
      <MenuItem>Settings</MenuItem>
    </Link>
  </MenuList>
);

export default Navbar;
