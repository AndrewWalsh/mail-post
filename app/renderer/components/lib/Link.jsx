import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const StyledLink = styled(RouterLink)`
    display: inherit;
    position: inherit;
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const Link = ({ children, ...rest }) => (
  <StyledLink {...rest}>
    {children}
  </StyledLink>
);

Link.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Link;
