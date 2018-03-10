// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const StyledLink = styled(RouterLink)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

type Props = {
  children: React.Node
};

const Link = ({ children, ...rest }: Props) => (
  <StyledLink {...rest}>
    {children}
  </StyledLink>
);

export default Link;
