import React from 'react';
import { Subscription } from 'react-apollo';
import { SUBSCRIPTION_NOTIFICATION } from '../../graphql';

import Header from './Header';

const HeaderContainer = () => (
  <Subscription subscription={SUBSCRIPTION_NOTIFICATION}>
    {({ data, loading }) => (
      <Header
        notification={data && data.notification}
        loading={loading}
      />
    )}
  </Subscription>
);

export default HeaderContainer;
