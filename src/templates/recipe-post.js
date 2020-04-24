import React from 'react';
import Layout from '../components/layout';
import SubHeading from '../components/recipe/SubHeading';
import Ingredient from '../components/recipe/Ingredient';
import Direction from '../components/recipe/Direction';
import Mast from '../components/recipe/Mast';

const RecipePost = ({ data }) => {
	const { recipe } = data;

	return (
		<Layout>
			<Mast
				image={recipe.images[0].childImageSharp.fluid}
				meta={recipe.meta}
				title={recipe.title}
			/>
			<SubHeading>Ingredients</SubHeading>
			<Ingredient.List>
				{recipe.ingredients.map((ingredient, i) => (
					<Ingredient.Item key={i}>{ingredient}</Ingredient.Item>
				))}
			</Ingredient.List>

			<SubHeading>Directions</SubHeading>
			<Direction.List>
				{recipe.directions.map((direction, i) => (
					<Direction.Item key={i}>
						{i + 1}. {direction}
					</Direction.Item>
				))}
			</Direction.List>
		</Layout>
	);
};

export default RecipePost;

export const query = graphql`
	query($id: String!) {
		recipe: dataJson(id: { eq: $id }) {
			id
			ingredients
			title
			stars
			images {
				childImageSharp {
					fluid(maxWidth: 300) {
						...GatsbyImageSharpFluid
					}
				}
			}
			directions
			meta {
				cook
				prep
				ready_in
			}
		}
	}
`;
