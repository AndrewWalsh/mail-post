import React from 'react';
import { Switch, Route } from 'react-router';
import {
  ROUTE_DASHBOARD,
  ROUTE_CAMPAIGNS,
  ROUTE_SETTINGS,
  ROUTE_LISTS,
} from './constants';

import Dashboard from './components/dashboard';
import Campaigns from './components/campaigns';
import Settings from './components/settings';
import Lists from './components/lists';
import { pageHoc } from './components/lib/hoc';

export default () => (
  <Switch>
    <Route path={ROUTE_DASHBOARD} component={pageHoc(Dashboard)} />
    <Route path={ROUTE_CAMPAIGNS} component={pageHoc(Campaigns)} />
    <Route path={ROUTE_SETTINGS} component={pageHoc(Settings)} />
    <Route path={ROUTE_LISTS} component={pageHoc(Lists)} />
    {/* Default route is the Dashboard */}
    <Route component={pageHoc(Dashboard)} />
  </Switch>
);
