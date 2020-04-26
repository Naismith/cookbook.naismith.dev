/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';
import './layout.css';

const GlobalStyle = createGlobalStyle`
	@media print {
		@page {
			size: auto;
			margin: 1cm;
			padding: 1rem;
		}
	}
`;

const Footer = styled.footer`
	@media print {
		display: none;
	}
`;

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
		<>
			<GlobalStyle />
			<Header siteTitle={data.site.siteMetadata.title} />

			<main>{children}</main>
			<Footer>
				© {new Date().getFullYear()}, Built with
				{` `}
				<a href="https://www.gatsbyjs.org">Gatsby</a>
			</Footer>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
