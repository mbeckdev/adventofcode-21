import React from 'react';
import styled from 'styled-components';

const WrapperDay = styled.div`
  background-color: grey;
  border: 1px solid red;
`;

function OnePuzzle(props) {
  return <WrapperDay day="props.puzzleNumber"></WrapperDay>;
}

export default OnePuzzle;
