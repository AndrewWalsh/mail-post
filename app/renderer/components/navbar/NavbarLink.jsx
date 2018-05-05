import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from 'material-ui/List';
import { Link } from '../lib';

const NavbarLink = ({
  to,
  text,
  renderIcon,
  children,
  ...rest
}) => (
  <Fragment>
    <Link to={to} {...rest}>
      <ListItem button>
        <ListItemText>{text}</ListItemText>
        <ListItemSecondaryAction>
          <ListItemIcon>
            {renderIcon()}
          </ListItemIcon>
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
    {children}
  </Fragment>
);

NavbarLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  renderIcon: PropTypes.func.isRequired,
  children: PropTypes.node,
};

NavbarLink.defaultProps = {
  children: null,
};

export default NavbarLink;
