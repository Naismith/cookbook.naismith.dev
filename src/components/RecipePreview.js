import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { navigate } from '@reach/router';
import Image from 'gatsby-image';

const StyledImage = styled(Image)`
	height: 20vw;
	width: 100%;

	@media screen and (max-width: 900px) {
		height: 40vw;
	}

	@media screen and (max-width: 600px) {
		height: 50vw;
	}
`;

const Container = styled.article`
	flex: 1;
	padding: 0 0.5rem;
	cursor: pointer;
	min-width: 33%;

	@media screen and (max-width: 900px) {
		min-width: 50%;
	}

	@media screen and (max-width: 600px) {
		min-width: 100%;
	}
`;

const List = styled.section`
	display: flex;
	flex-wrap: wrap;
	align-items: stretch;
	justify-content: space-between;
	margin: 0 -0.5rem;
`;

const StyledLink = styled(Link)`
	color: inherit;
	text-decoration: none;
`;

const Title = styled.h3`
	margin-top: 1rem;
`;

const Item = ({ recipe }) => {
	const onClick = () => {
		navigate(`/recipes/${recipe.fields.slug}`);
	};

	return (
		<Container onClick={onClick}>
			<StyledImage fluid={recipe.images[0].childImageSharp.fluid} />
			<Title>{recipe.title}</Title>
		</Container>
	);
};

const RecipePreview = {
	Item,
	List,
};

export default RecipePreview;
