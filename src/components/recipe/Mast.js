import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import MetaInfo from '../MetaInfo';
import Image from 'gatsby-image';
import Box from '../Box';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media print {
    flex-direction: row;
    align-items: center;
    margin-bottom: 10pt;
  }
`;

const StyledMast = styled(Image)`
  max-height: 400px;
  margin-bottom: 2rem;

  @media print {
    width: 150pt;
    height: 150pt;
    margin-bottom: 10pt;
  }
`;

const Mast = ({ title, meta, image }) => (
  <Container>
    <StyledMast fluid={image} />
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flex={1}
    >
      <Typography align="center" variant="h2" component="h1">
        {title}
      </Typography>

      <MetaInfo prep={meta.prep} cook={meta.cook} readyIn={meta.ready_in} />
    </Box>
  </Container>
);

export default Mast;
