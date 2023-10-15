import React from 'react'
import { createTheme } from '@material-ui/core';
import { css, Global as EmotionGlobalStyle } from '@emotion/react';

export const theme = createTheme({
	palette: {
		type: 'dark',
	},
});

export const GlobalStyle = () => (<EmotionGlobalStyle styles={css`
	@media print {
		@page {
			size: auto;
			margin: 1cm;
			padding: 1rem;
		}
	}
`} />)
