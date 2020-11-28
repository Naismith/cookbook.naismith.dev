/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');
const slugify = require('slugify');

exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions;
	if (node.internal.type === `DataJson`) {
		const value = slugify(node.title, { lower: true });

		createNodeField({
			node,
			name: `slug`,
			value,
		});
	}
};

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;
	const result = await graphql(`
		query {
			recipes: allDataJson {
				nodes {
					fields {
						slug
					}
					id
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
	`);

	result.data.recipes.nodes.forEach((node) => {
		createPage({
			path: `/recipes/${node.fields.slug}`,
			component: path.resolve(`./src/templates/recipe-post.js`),
			context: {
				id: node.id,
			},
			// context: {
			//   // Data passed to context is available
			//   // in page queries as GraphQL variables.
			//   slug: node.fields.slug,
			// },
		});
	});
};
