import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Providers } from './Providers';
import { GlobalStyle } from '../common/theme';
import Header from './Header';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Providers>
      <GlobalStyle />
      <Header siteTitle={data.site.siteMetadata.title} />

      <main>{children}</main>
    </Providers>
  );
};

export default Layout;
