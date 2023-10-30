import { Link } from 'gatsby';
import styled from '@emotion/styled'
import Container from '@mui/material/Container';
import React from 'react';

const Background = styled.header`
  background-color: rebeccapurple;
  margin-bottom: 1.45rem;

  @media print {
    display: none;
  }
`;

const SiteTitle = styled.h1`
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const StyledContainer = styled(Container)`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const Header = ({ siteTitle = '' }) => (
  <Background>
    <StyledContainer maxWidth="xl">
      <SiteTitle>
        <StyledLink to="/">{siteTitle}</StyledLink>
      </SiteTitle>
    </StyledContainer>
  </Background>
);

export default Header;