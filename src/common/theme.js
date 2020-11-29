import { createMuiTheme } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export const GlobalStyle = createGlobalStyle`
	@media print {
		@page {
			size: auto;
			margin: 1cm;
			padding: 1rem;
		}
	}
`;
