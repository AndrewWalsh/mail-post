import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import { Link } from '../lib';

const styles = {
  ListItem: {
    padding: '12px 16px',
  },
  ListItemIcon: {
    margin: '0px',
  },
};


const NavbarLink = ({
  to,
  text,
  renderIcon,
  children,
  classes,
  ...rest
}) => (
  <Fragment>
    <Link to={to} {...rest}>
      <ListItem button classes={{ root: classes.ListItem }}>
        <ListItemIcon classes={{ root: classes.ListItemIcon }}>
          {renderIcon()}
        </ListItemIcon>
        <ListItemText>
          {text}
        </ListItemText>
      </ListItem>
    </Link>
    {children}
  </Fragment>
);

NavbarLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  renderIcon: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
};

NavbarLink.defaultProps = {
  children: null,
};

export default withStyles(styles)(NavbarLink);
