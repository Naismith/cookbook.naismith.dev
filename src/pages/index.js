import React, { useMemo, useState } from 'react';
import { graphql } from 'gatsby';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Layout from '../components/layout';
import SEO from '../components/seo';
import RecipePreview from '../components/RecipePreview';
import { CategorySelect } from '../components/CategorySelect';

const byName = (a, b) => {
	const aLower = a.toLowerCase();
	const bLower = b.toLowerCase();
	if (aLower < bLower) return -1;
	if (aLower > bLower) return 1;
	return 0;
};

const usePageLogic = (data) => {
	const [activeCategories, setActiveCategories] = useState([]);

	const categories = useMemo(() => {
		const categoryList = data.recipes.nodes.reduce((acc, node) => {
			return [...acc, ...node.categories];
		}, []);

		return [...new Set(categoryList)].sort(byName);
	}, [data]);

	const recipes = useMemo(() => {
		let recipes = data.recipes.nodes;

		if (activeCategories.length) {
			recipes = recipes.filter((recipe) => {
				if (!recipe.categories) {
					console.log('error');
				}
				return recipe.categories.some((category) =>
					activeCategories.includes(category),
				);
			});
		}

		recipes = recipes.sort((a, b) => byName(a.title, b.title));

		return recipes;
	}, [data, activeCategories]);

	const handleCategoryClick = (name) => {
		if (activeCategories.includes(name))
			setActiveCategories((prev) => prev.filter((p) => p !== name));
		else setActiveCategories((prev) => [...prev, name]);
	};

	return {
		activeCategories,
		handleCategoryClick,
		recipes,
		categories,
	};
};

const IndexPage = ({ data }) => {
	const {
		categories,
		activeCategories,
		handleCategoryClick,
		recipes,
	} = usePageLogic(data);

	return (
		<Layout siteTitle="Naismith Cookbook">
			<SEO title="Home" />
			<Container>
				<CategorySelect
					categories={categories}
					activeCategories={activeCategories}
					handleCategoryClick={handleCategoryClick}
				/>
				<Grid container alignItems="stretch" spacing={3}>
					{recipes.map((recipe) => (
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
				categories
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
