import React from 'react';
import { Checkbox } from '@mui/material'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  margin-left: -9px;

  @media print {
    margin-bottom: 1rem;
  }
`;

const Item = ({ children }) => (
  <StyledItem>
    <Checkbox />
    {children}
  </StyledItem>
)

const StyledItem = styled.li`
  width: 100%;
  margin: 0;
  font-size: 1.5rem;

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
