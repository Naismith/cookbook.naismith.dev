import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import RecipePreview from '../components/RecipePreview';

const IndexPage = ({ data }) => {
	return (
		<Layout siteTitle="Naismith Cookbook">
			<SEO title="Home" />
			<RecipePreview.List>
				{data.recipes.nodes.map((recipe) => (
					<RecipePreview.Item key={recipe.id} recipe={recipe} />
				))}
			</RecipePreview.List>
		</Layout>
	);
};

export default IndexPage;

export const query = graphql`
	query IndexPageQuery {
		recipes: allDataJson {
			nodes {
				fields {
					slug
				}
				id
				images {
					childImageSharp {
						fluid(maxWidth: 300) {
							...GatsbyImageSharpFluid
						}
					}
				}
				ingredients
				title
				stars
				directions
				meta {
					cook
					prep
					ready_in
				}
			}
		}
	}
`;
