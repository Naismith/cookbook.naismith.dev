import styled, { css } from 'styled-components';

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

  ${(props) =>
    props.strong &&
    css`
      margin-top: 1rem;
      font-size: 1rem;
      font-weight: bold;
    `}

  @media print {
    font-size: 0.8rem;
  }
`;

const Ingredient = {
  List,
  Item,
};

export default Ingredient;
