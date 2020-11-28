import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';

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
                        activeCategories.includes(category)
                            ? 'contained'
                            : 'outlined'
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
