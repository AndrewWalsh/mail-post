/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import {
  ROUTE_DASHBOARD,
  ROUTE_CAMPAIGNS,
  ROUTE_SETTINGS,
} from './constants';
import Dashboard from './components/dashboard';
import Campaigns from './components/campaigns';
import Settings from './components/settings';

export default () => (
  <Switch>
    <Route path={ROUTE_DASHBOARD} component={Dashboard} />
    <Route path={ROUTE_CAMPAIGNS} component={Campaigns} />
    <Route path={ROUTE_SETTINGS} component={Settings} />
    {/* Default route is the Dashboard */}
    <Route component={Dashboard} />
  </Switch>
);
