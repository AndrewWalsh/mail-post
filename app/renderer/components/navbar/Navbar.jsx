import React from 'react';
import List from '@material-ui/core/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EmailIcon from '@material-ui/icons/Email';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';

import NavbarLink from './NavbarLink';

import {
  ROUTE_DASHBOARD,
  ROUTE_CAMPAIGNS,
  ROUTE_NEW_CAMPAIGN,
  ROUTE_SETTINGS,
  ROUTE_LISTS,
} from '../../constants';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
    fontWeightRegular: 300,
  },
});

const HeaderTitle = styled.div`
  color: white;
  height: 10vh;
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const Navbar = () => (
  <MuiThemeProvider theme={theme}>
    <HeaderTitle>
      <h1>
        MailPost
      </h1>
    </HeaderTitle>
    <Divider />
    <List>
      <NavbarLink
        to={ROUTE_DASHBOARD}
        text="Dashboard"
        renderIcon={() => <DashboardIcon />}
        data-test="nav-dashboard"
      />
      <Divider />
      <NavbarLink
        to={ROUTE_CAMPAIGNS}
        text="Campaigns"
        renderIcon={() => <EmailIcon />}
        data-test="nav-campaigns"
      >
        <NavbarLink
          to={ROUTE_NEW_CAMPAIGN}
          text="New Campaign"
        />
      </NavbarLink>
      <Divider />
      <NavbarLink
        to={ROUTE_LISTS}
        text="Lists"
        renderIcon={() => <ListIcon />}
        data-test="nav-lists"
      />
      <Divider />
      <NavbarLink
        to={ROUTE_SETTINGS}
        text="Settings"
        renderIcon={() => <SettingsIcon />}
        data-test="nav-settings"
      />
    </List>
  </MuiThemeProvider>
);

export default Navbar;
