import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { navigate } from '@reach/router';
import Image from 'gatsby-image';

const StyledImage = styled(Image)`
  height: 20vw;
  width: 100%;

  @media screen and (max-width: 900px) {
    height: 40vw;
  }

  @media screen and (max-width: 600px) {
    height: 50vw;
  }
`;

const PreviewCard = styled(Card)`
  height: 100%;
`;

const RecipePreview = ({ recipe }) => {
  const onClick = () => {
    navigate(`/recipes/${recipe.fields.slug}`);
  };

  return (
    <PreviewCard>
      <CardActionArea onClick={onClick}>
        <StyledImage fluid={recipe.images[0].childImageSharp.fluid} />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {recipe.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </PreviewCard>
  );
};

export default RecipePreview;
