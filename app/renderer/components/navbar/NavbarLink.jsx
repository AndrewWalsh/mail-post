import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';

import { Link } from '../lib';

const styles = {
  ListItem: {
    padding: '12px 16px',
  },
  ListItemNested: {
    padding: '6px 0 6px 24px', // Extra left padding
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
  nested,
  ...rest
}) => (
  <Fragment>
    <Link to={to} {...rest}>
      <ListItem button classes={{ root: nested ? classes.ListItemNested : classes.ListItem }}>
        <ListItemIcon classes={{ root: classes.ListItemIcon }}>
          {renderIcon ? renderIcon() : <KeyboardArrowRightIcon />}
        </ListItemIcon>
        <ListItemText>
          {text}
        </ListItemText>
      </ListItem>
    </Link>
    {React.Children.map(
      children,
      child => React.cloneElement(child, { nested: 1 }),
    )}
  </Fragment>
);

NavbarLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  renderIcon: PropTypes.func,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  nested: PropTypes.number,
  children: PropTypes.node,
};

NavbarLink.defaultProps = {
  nested: null,
  children: null,
  renderIcon: null,
};

export default withStyles(styles)(NavbarLink);
