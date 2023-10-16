import React, { useMemo, useState } from 'react';
import { graphql } from 'gatsby';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Layout from '../components/layout';
import SEO from '../components/seo';
import RecipePreview from '../components/RecipePreview';
import { CategorySelect } from '../components/CategorySelect';
import { Box } from '@mui/material';

const byName = (a, b) => {
  const aLower = a.toLowerCase();
  const bLower = b.toLowerCase();
  if (aLower < bLower) return -1;
  if (aLower > bLower) return 1;
  return 0;
};

const usePageLogic = (data) => {
  const [activeCategories, setActiveCategories] = useState([]);
  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    const categoryList = data.allRecipe.nodes.reduce((acc, node) => {
      return [...acc, ...node.categories];
    }, []);

    return [...new Set(categoryList)].sort(byName);
  }, [data]);

  const recipes = useMemo(() => {
    let recipes = data.allRecipe.nodes;

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

    if (search) {
      const lowerSearch = search.toLowerCase();
      recipes = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(lowerSearch);
      })
    }

    recipes = recipes.sort((a, b) => byName(a.title, b.title));

    return recipes;
  }, [data, activeCategories, search]);

  const handleCategoryClick = (name) => {
    if (activeCategories.includes(name))
      setActiveCategories((prev) => prev.filter((p) => p !== name));
    else setActiveCategories((prev) => [...prev, name]);
  };

  return {
    search, setSearch,
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
    search,
    setSearch,
  } = usePageLogic(data);

  return (
    <Layout siteTitle="Naismith Cookbook">
      <SEO title="Home" />
      <Container maxWidth="xl">
        <Box mb={2}>

          <TextField variant="outlined" label="Search" fullWidth onChange={(e) => setSearch(e.target.value)} value={search} />
        </Box>
        <CategorySelect
          categories={categories}
          activeCategories={activeCategories}
          handleCategoryClick={handleCategoryClick}
        />
        <Grid container alignItems="stretch" spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={3} key={recipe.id}>
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
    allRecipe {
      nodes {
        fields {
          slug
        }
        id
        categories
        images {
          childImageSharp {
            fluid(maxWidth: 500) {
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
