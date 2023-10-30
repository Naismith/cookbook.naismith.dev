import React from 'react';
import { Box, Button } from '@mui/material';

export const CategorySelect = ({
  categories,
  activeCategories,
  handleCategoryClick,
}) => {
  return (
    <Box mb={3}>
      {categories.map((category) => (
        <Button
          color="primary"
          variant={
            activeCategories.includes(category) ? 'contained' : 'outlined'
          }
          onClick={() => handleCategoryClick(category)}
          key={category}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
};
