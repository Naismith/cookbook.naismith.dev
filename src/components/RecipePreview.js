import React from 'react';
import styled from '@emotion/styled'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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
