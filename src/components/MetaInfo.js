import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.ul`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Text = styled.div`
  line-height: 1;
`;

const MetaItem = styled.li`
  padding: 1rem 2rem;
  text-align: center;

  &:not(:last-child) {
    border-right: 1px solid #eee;
  }
`;

const MetaInfo = ({ prep, cook, readyIn }) => {
  if (!prep && !cook && !readyIn) return null;

  return (
    <Wrapper>
      <MetaItem>
        <Text>Prep</Text>
        <Text>{prep}</Text>
      </MetaItem>
      <MetaItem>
        <Text>Cook</Text>
        <Text>{cook}</Text>
      </MetaItem>
      <MetaItem>
        <Text>Ready In</Text>
        <Text>{readyIn}</Text>
      </MetaItem>
    </Wrapper>
  );
};

export default MetaInfo;
