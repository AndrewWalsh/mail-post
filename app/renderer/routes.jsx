import React from 'react';
import { Switch, Route } from 'react-router';
import {
  ROUTE_DASHBOARD,
  ROUTE_CAMPAIGNS,
  ROUTE_NEW_CAMPAIGN,
  ROUTE_SETTINGS,
  ROUTE_LISTS,
} from './constants';

import Dashboard from './components/dashboard';
import Campaigns from './components/campaigns';
import NewCampaign from './components/campaigns/new-campaign';
import Settings from './components/settings';
import Lists from './components/lists';
import { PageHoc } from './components/lib/hoc';

export default () => (
  <Switch>
    <Route path={ROUTE_DASHBOARD} component={PageHoc(Dashboard)} />
    <Route path={ROUTE_CAMPAIGNS} component={PageHoc(Campaigns)} />
    <Route path={ROUTE_NEW_CAMPAIGN} component={PageHoc(NewCampaign)} />
    <Route path={ROUTE_SETTINGS} component={PageHoc(Settings)} />
    <Route path={ROUTE_LISTS} component={PageHoc(Lists)} />
    {/* Default route is the Dashboard */}
    <Route component={PageHoc(Dashboard)} />
  </Switch>
);
