import React from 'react';
import { graphql } from 'gatsby';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Layout from '../components/layout';
import SEO from '../components/seo';
import RecipePreview from '../components/RecipePreview';

const IndexPage = ({ data }) => {
	return (
		<Layout siteTitle="Naismith Cookbook">
			<SEO title="Home" />
			<Container>
				<Grid container alignItems="stretch" spacing={3}>
					{data.recipes.nodes
						// .filter((recipe) => {
						// 	return recipe.title
						// 		.toLowerCase()
						// 		.includes(searchValue.toLowerCase());
						// })
						.map((recipe) => (
							<Grid item xs={12} sm={6} md={4} key={recipe.id}>
								<RecipePreview recipe={recipe} />
							</Grid>
						))}
				</Grid>
			</Container>
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
