import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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

const Container = styled.article`
  flex: 1;
  padding: 0 0.5rem;
  cursor: pointer;
  min-width: 33%;

  @media screen and (max-width: 900px) {
    min-width: 50%;
  }

  @media screen and (max-width: 600px) {
    min-width: 100%;
  }
`;

const Title = styled.h3`
  margin-top: 1rem;
`;

const PreviewCard = styled(Card)`
  height: 100%;
`;

const RecipePreview = ({ recipe }) => {
  const onClick = () => {
    navigate(`/recipes/${recipe.fields.slug}`);
  };

  const classes = {};

  return (
    <PreviewCard>
      <CardActionArea onClick={onClick}>
        <StyledImage fluid={recipe.images[0].childImageSharp.fluid} />
        {/* <CardMedia
					className={classes.media}
					image="/static/images/cards/contemplative-reptile.jpg"
					title="Contemplative Reptile"
				/> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {recipe.title}
          </Typography>
          {/* <Typography
						variant="body2"
						color="textSecondary"
						component="p"
					>
						Lizards are a widespread group of squamate reptiles,
						with over 6,000 species, ranging across all continents
						except Antarctica
					</Typography> */}
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
				<Button size="small" color="primary">
					Share
				</Button>
				<Button size="small" color="primary">
					Learn More
				</Button>
			</CardActions> */}
    </PreviewCard>
    // <Container onClick={onClick}>
    // 	<StyledImage fluid={recipe.images[0].childImageSharp.fluid} />
    // 	<Title>{recipe.title}</Title>
    // </Container>
  );
};

export default RecipePreview;
