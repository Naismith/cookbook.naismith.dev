import { createTheme, createGlobalStyle } from '@material-ui/core';

export const theme = createTheme({
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
