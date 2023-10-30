import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../common/theme';

export const Providers = ({ children }) => (
  <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>
);
