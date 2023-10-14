import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../common/theme';

export const Providers = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
