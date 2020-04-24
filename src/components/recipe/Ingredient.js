import styled from 'styled-components';

const List = styled.ul`
	padding: 0;
	margin: 0;
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 2rem;

	@media print {
		margin-bottom: 1rem;
	}
`;

const Item = styled.li`
	width: 50%;
	margin: 0;

	@media print {
		font-size: 0.8rem;
	}
`;

const Ingredient = {
	List,
	Item,
};

export default Ingredient;
