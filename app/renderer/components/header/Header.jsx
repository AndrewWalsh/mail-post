import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

const StyledWrapper = styled.div`
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default class Header extends Component {
  constructor() {
    super();
    this.state = { notifications: {}, active: null };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.notification) {
      return {
        ...prevState,
        active: [nextProps.notification.id],
        [nextProps.notification.id]: {
          ...nextProps.notification,
        },
      };
    }
    return null;
  }

  render() {
    const { loading, notification } = this.props; // eslint-disable-line
    return (
      <StyledWrapper>
        {notification ? notification.type : 'a'}

        <Badge badgeContent={4} color="secondary">
          <MailIcon />
        </Badge>
      </StyledWrapper>
    );
  }
}

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  notification: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

Header.defaultProps = {
  notification: null,
};
