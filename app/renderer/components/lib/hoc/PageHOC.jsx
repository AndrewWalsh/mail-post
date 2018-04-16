// @flow
import * as React from 'react';
import styled from 'styled-components';

const StyledPageHOC = styled.section`
  padding: 1em;
`;

const PageHOC = (Component: React.ComponentType<any>) => () => (
  <StyledPageHOC>
    <Component />
  </StyledPageHOC>
);

export default PageHOC;
