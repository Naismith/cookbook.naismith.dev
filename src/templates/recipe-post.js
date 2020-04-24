import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

const IngredientList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`

const Ingredient = styled.li`
  width: 50%;
`

const DirectionsList = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`

const RecipePost = ({ data }) => {
  const { recipe } = data
  console.log(recipe)
  return (
    <Layout>
      <div>
        <img src="" height="300px" width="400px" />
      </div>
      <h1>{recipe.title}</h1>

      <h2>Ingredients</h2>
      <IngredientList>
        {recipe.ingredients.map((ingredient, i) => (
          <Ingredient key={i}>{ingredient}</Ingredient>
        ))}
      </IngredientList>

      <h2>Directions</h2>
      <DirectionsList>
        {recipe.directions.map((direction, i) => (
          <li key={i}>
            {i + 1}. {direction}
          </li>
        ))}
      </DirectionsList>
    </Layout>
  )
}

export default RecipePost

export const query = graphql`
  query($id: String!) {
    recipe: dataJson(id: { eq: $id }) {
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
`
