import React, { useRef, useState } from 'react';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Layout from '../components/layout';
import SubHeading from '../components/recipe/SubHeading';
import Ingredient from '../components/recipe/Ingredient';
import Direction from '../components/recipe/Direction';
import Mast from '../components/recipe/Mast';
import matchAll from 'string.prototype.matchall';
import { Box } from '@mui/material';
import { graphql } from 'gatsby'

matchAll.shim();

const parseIngredient = (ingredient) => {
  const expression = RegExp(/{{([^}]*)}}/g);

  const keys = [...ingredient.matchAll(expression)]
    .map(([_, key]) => key)
    .reduce((acc, match) => ({ ...acc, [match]: true }), {});

  return { ingredient: ingredient.replace(expression, ''), attributes: keys };
};

const RecipePost = ({ data }) => {
  const wakeLockRef = useRef(null);
  const [useLock, setUseLock] = useState(false);
  const { recipe } = data;

  const updateUseLock = async (val) => {
    const wakeLock = wakeLockRef.current;

    if (wakeLock) {
      await wakeLock.release();
      wakeLockRef.current = null;
      setUseLock(false);
    }

    if (val) {
      wakeLockRef.current = await navigator.wakeLock.request("screen");
      setUseLock(true);
    }
  };

  return (
    <Layout>
      <Container>
        <Mast
          image={recipe.images[0].childImageSharp.fluid}
          meta={recipe.meta}
          title={recipe.title}
        />
        <Box textAlign={"center"} mb={2}>
          <FormControlLabel
            control={<Checkbox color="primary" checked={useLock} onChange={e => updateUseLock(e.target.checked)} />}
            label="Prevent screen lock"
          />

        </Box>
        <SubHeading>Ingredients</SubHeading>
        <Ingredient.List>
          {recipe.ingredients.map((source, i) => {
            const { ingredient, attributes } = parseIngredient(source);
            return (
              <Ingredient.Item strong={attributes.strong} key={i}>
                {ingredient}
              </Ingredient.Item>
            );
          })}
        </Ingredient.List>

        <SubHeading>Directions</SubHeading>
        <Direction.List>
          {recipe.directions.map((direction, i) => (
            <Direction.Item key={i}>
              {i + 1}. {direction}
            </Direction.Item>
          ))}
        </Direction.List>
      </Container>
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
          fluid(maxWidth: 1920) {
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
