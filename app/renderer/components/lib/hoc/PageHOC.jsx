import React from 'react';
import styled from 'styled-components';

const StyledPageHOC = styled.section`
  padding: 1em;
`;

const pageHoc = Component => () => (
  <StyledPageHOC>
    <Component />
  </StyledPageHOC>
);

export default pageHoc;
