import React from 'react';
import { MenuList } from 'material-ui/Menu';
import DashboardIcon from 'material-ui-icons/Dashboard';
import EmailIcon from 'material-ui-icons/Email';
import ListIcon from 'material-ui-icons/List';
import SettingsIcon from 'material-ui-icons/Settings';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import NavbarLink from './NavbarLink';

import {
  ROUTE_DASHBOARD,
  ROUTE_CAMPAIGNS,
  ROUTE_SETTINGS,
  ROUTE_LISTS,
} from '../../constants';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontWeightRegular: 300,
  },
});

const Navbar = () => (
  <MuiThemeProvider theme={theme}>
    <MenuList>
      <NavbarLink
        to={ROUTE_DASHBOARD}
        text="Dashboard"
        renderIcon={() => <DashboardIcon />}
        data-test="nav-dashboard"
      />

      <NavbarLink
        to={ROUTE_CAMPAIGNS}
        text="Campaigns"
        renderIcon={() => <EmailIcon />}
        data-test="nav-campaigns"
      />

      <NavbarLink
        to={ROUTE_LISTS}
        text="Lists"
        renderIcon={() => <ListIcon />}
        data-test="nav-lists"
      />

      <NavbarLink
        to={ROUTE_SETTINGS}
        text="Settings"
        renderIcon={() => <SettingsIcon />}
        data-test="nav-settings"
      />
    </MenuList>
  </MuiThemeProvider>
);

export default Navbar;
