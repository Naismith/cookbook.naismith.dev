import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Naismith Cookbook</h1>
      {data.recipes.nodes.map(recipe => (
        <div key={recipe.id}>
          <h1>{recipe.title}</h1>
          <Link to={`/recipes/${recipe.fields.slug}`}>Link</Link>
        </div>
      ))}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
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
`
