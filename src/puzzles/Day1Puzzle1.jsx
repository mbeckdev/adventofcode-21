import React from 'react';
import data from './Day1-Data.js';

import styled from 'styled-components';

const WrapperDay1Puzzle1 = styled.div`
  border: '1px solid green';
`;

const findNumberOfIncreases = (numberArray) => {
  let countOfIncreases = 0;

  for (let i = 1; i < numberArray.length; i++) {
    if (numberArray[i] > numberArray[i - 1]) countOfIncreases++;
  }

  return countOfIncreases;
};

let answer = findNumberOfIncreases(data);

function Day1Puzzle1() {
  return (
    <WrapperDay1Puzzle1>
      <div>Day 1 Puzzle1 Here</div>
      <div>
        <a href="https://adventofcode.com/2021/day/1">
          Link to problem statement
        </a>
      </div>
      <div>Answer is: {answer}</div>
    </WrapperDay1Puzzle1>
  );
}

export default Day1Puzzle1;
