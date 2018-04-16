import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Navbar from './navbar';
import {
  COLOUR_PRIMARY,
  COLOUR_SECONDARY,
  COLOUR_WHITE,
} from '../constants';

const HEADER_HEIGHT = '10vh';
const NAV_WIDTH = '20vw';

const Wrapper = styled.section`
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  display: grid;
  grid-template:
      "hd hd" minmax(min-content, ${HEADER_HEIGHT})
      "nv mn" 1fr / minmax(min-content, ${NAV_WIDTH}) 1fr;
`;
const Header = styled.header`
  background-color: ${COLOUR_PRIMARY};
  grid-area: hd;
`;
const HeaderTitle = styled.div`
  color: ${COLOUR_WHITE};
  height: 100%;
  width: ${NAV_WIDTH};
  display: flex;
  align-items: center;
  margin-left: 16px;
`;
const Nav = styled.nav`
  background-color: ${COLOUR_SECONDARY};
  grid-area: nv;
`;
const Main = styled.main`
  background-color: ${COLOUR_WHITE};
  grid-area: mn;
`;

const Layout = ({ children }) => (
  <Wrapper>
    <Header>
      <HeaderTitle>
        <h1>
          MailPost
        </h1>
      </HeaderTitle>
    </Header>

    <Nav>
      <Navbar />
    </Nav>

    <Main>
      {children}
    </Main>
  </Wrapper>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
