import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemSecondaryAction } from 'material-ui/List';
import { Link } from '../lib';

const NavbarLink = ({
  to,
  text,
  renderIcon,
  ...rest
}) => (
  <Link to={to} {...rest} >
    <MenuItem>
      {text}
      <ListItemSecondaryAction>
        <ListItemIcon>
          {renderIcon()}
        </ListItemIcon>
      </ListItemSecondaryAction>
    </MenuItem>
  </Link>
);

NavbarLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  renderIcon: PropTypes.func.isRequired,
};

export default NavbarLink;
