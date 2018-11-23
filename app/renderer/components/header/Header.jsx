import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  tail,
  head,
  prop,
  prepend,
} from 'ramda';

import Badge from '@material-ui/core/Badge';
import NotificationIcon from '@material-ui/icons/NotificationImportant';

import {
  NOTIFICATION_TYPE_ADD,
  NOTIFICATION_TYPE_UPDATE,
  NOTIFICATION_TYPE_REMOVE,
} from '../../../lib/shared-constants';

const StyledWrapper = styled.div`
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default class Header extends Component {
  constructor() {
    super();
    this.state = { notifications: [], activeId: null };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { notification } = nextProps;
    if (notification) {
      const add = {
        activeId: notification.id,
        notifications: prevState.notifications.find(n => n.id === notification.id)
          ? prevState.notifications
          : prepend(notification, prevState.notifications),
      };
      const update = {
        activeId: notification.id,
        notifications: prevState.notifications.map(
          n => (n.id === notification.id ? notification : n)),
      };
      const remove = {
        activeId: prop('id', head(tail(prevState.notifications))),
        notifications: prevState.notifications.filter(n => n.id !== notification.id),
      };
      const action = ((type) => {
        switch (type) {
          case NOTIFICATION_TYPE_ADD: return add;
          case NOTIFICATION_TYPE_UPDATE: return update;
          case NOTIFICATION_TYPE_REMOVE: return remove;
          default: return prevState;
        }
      })(notification.type);
      return Object.assign({}, prevState, action);
    }
    return null;
  }

  render() {
    const { notifications, activeId } = this.state;
    return (
      <StyledWrapper>
        {activeId ? notifications.find(n => n.id === activeId).text + notifications.find(n => n.id === activeId).progress : 'Nothing to show'}

        {
          notifications.length
            ? (
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationIcon />
              </Badge>
            )
            : <NotificationIcon />
        }
      </StyledWrapper>
    );
  }
}

Header.propTypes = {
  notification: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    progress: PropTypes.number,
  }),
};

Header.defaultProps = {
  notification: null,
};
