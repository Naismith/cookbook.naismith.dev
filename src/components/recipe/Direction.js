import styled from 'styled-components';

const List = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;

  @media print {
    margin-bottom: 1rem;
  }
`;

const Item = styled.li`
  margin-bottom: 0.5rem;

  @media print {
    margin: 0;
    font-size: 0.8rem;
  }
`;

const Direction = {
  List,
  Item,
};

export default Direction;
