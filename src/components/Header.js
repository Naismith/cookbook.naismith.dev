import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

const Container = styled.div`
	margin: 0 auto;
	max-width: 960px;
	padding: 1.45rem 1.0875rem;
`;

const Header = ({ siteTitle = '' }) => (
	<Background>
		<Container>
			<SiteTitle>
				<StyledLink to="/">{siteTitle}</StyledLink>
			</SiteTitle>
		</Container>
	</Background>
);

export default Header;
