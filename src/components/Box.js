import styled from 'styled-components/macro';
import {
	space,
	color,
	layout,
	position,
	typography,
	flexbox,
	border,
} from 'styled-system';

const Box = styled.div(
	{
		boxSizing: 'border-box',
		minWidth: 0,
		padding: 0,
	},
	space,
	color,
	layout,
	border,
	position,
	typography,
	flexbox,
);

export default Box;
