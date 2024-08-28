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
  if (node.internal.type === `Recipe`) {
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
      allRecipe {
        nodes {
          fields {
            slug
          }
          id
          ingredients
          ingredientsV2 {
            name
            unit
          }
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

  const recipes = result?.data?.allRecipe?.nodes || [];

  recipes.forEach((node) => {
    createPage({
      path: `/recipes/${node.fields.slug}`,
      matchPath: '/recipes/:id/',
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
