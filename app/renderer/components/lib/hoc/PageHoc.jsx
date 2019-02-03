import React from 'react';
import styled from 'styled-components';

const StyledPageHOC = styled.section`
  padding: 1em;
`;

const PageHoc = Component => props => (
  <StyledPageHOC>
    <Component {...props} />
  </StyledPageHOC>
);

export default PageHoc;
