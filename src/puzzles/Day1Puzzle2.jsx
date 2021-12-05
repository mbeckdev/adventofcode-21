import React from 'react';
import data from './Day1-Data.js';

import styled from 'styled-components';

const WrapperDay1Puzzle1 = styled.div`
  border: '1px solid green';
`;

const findNumberOfSlidingWindowIncreases = (theArray) => {
  let countOfIncreases = 0;

  // for (let i = 1; i < numberArray.length; i++) {
  //   if (numberArray[i] > numberArray[i - 1]) countOfIncreases++;
  // }

  for (let i = 2; i < theArray.length; i++) {
    let window1 = theArray[i - 2] + theArray[i - 1] + theArray[i];
    let window2 = theArray[i - 1] + theArray[i] + theArray[i + 1];

    if (window2 > window1) countOfIncreases++;
  }

  return countOfIncreases;
};

let answer = findNumberOfSlidingWindowIncreases(data);

function Day1Puzzle1() {
  return (
    <WrapperDay1Puzzle1>
      <div>Day 1 Puzzle2 Here</div>
      <div>
        <a href="https://adventofcode.com/2021/day/1#part2">
          Link to problem statement
        </a>
      </div>
      <div>Answer is: {answer}</div>
    </WrapperDay1Puzzle1>
  );
}

export default Day1Puzzle1;
