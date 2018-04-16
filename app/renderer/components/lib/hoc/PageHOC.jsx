import React from 'react';
import styled from 'styled-components';

const StyledPageHOC = styled.section`
  padding: 1em;
`;

const PageHoc = Component => () => (
  <StyledPageHOC>
    <Component />
  </StyledPageHOC>
);

export default PageHoc;
