import React from 'react';
import data from './Day2-Data.js';

import styled from 'styled-components';

const WrapperDay2Puzzle1 = styled.div`
  border: '1px solid green';
`;

const findAnswer = (theArray) => {
  let theAnswer = 0;

  let horizPosition = 0;
  let depth = 0;

  // for (let i = 0; i < 4; i++) {
  for (let i = 0; i < theArray.length; i++) {
    let singleOrderArray = theArray[i].split(' '); // like ["forward", 8]

    let direction = singleOrderArray[0];
    let distance = Number(singleOrderArray[1]);
    // console.log('i', i);
    // console.log('singleOrderArray', singleOrderArray);
    // console.log('distance direction=', distance, ' ', direction);

    if (direction === 'forward') {
      horizPosition += distance;
    } else if (direction === 'down') {
      depth += distance;
    } else if (direction === 'up') {
      depth -= distance;
    }
  }

  theAnswer = horizPosition * depth;

  // console.log('end horizPosition', horizPosition);
  // console.log('end depth', depth);
  // console.log('theAnswer', theAnswer);

  return theAnswer;
};

let answer = findAnswer(data);

function Day2Puzzle1() {
  return (
    <WrapperDay2Puzzle1>
      <div>--- Day 2 Puzzle 1 ---</div>
      <div>
        <a href="https://adventofcode.com/2021/day/2">
          Link to problem statement
        </a>
      </div>
      <div>Answer is: {answer}</div>
    </WrapperDay2Puzzle1>
  );
}

export default Day2Puzzle1;
