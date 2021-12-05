import React from 'react';
import data from './Day2-Data.js';

import styled from 'styled-components';

const WrapperDay2Puzzle2 = styled.div`
  border: '1px solid green';
`;

const findAnswer = (theArray) => {
  let theAnswer = 0;

  let horizPosition = 0;
  let depth = 0;

  let aim = 0;

  for (let i = 0; i < theArray.length; i++) {
    let singleOrderArray = theArray[i].split(' '); // like ["forward", 8]

    let direction = singleOrderArray[0];
    let distance = Number(singleOrderArray[1]);

    console.log(
      'horizPosition, depth, aim',
      horizPosition,
      ' ',
      depth,
      ' ',
      aim
    );
    console.log('singleOrderArray ', singleOrderArray[0], singleOrderArray[1]);

    console.log('aim', aim);
    if (direction === 'forward') {
      horizPosition += distance;
      depth += aim * distance;
    } else if (direction === 'down') {
      aim += distance;
    } else if (direction === 'up') {
      aim -= distance;
    }
  }

  theAnswer = horizPosition * depth;

  console.log('end horizPosition', horizPosition);
  console.log('end depth', depth);
  console.log('theAnswer', theAnswer);

  return theAnswer;
};

let answer = findAnswer(data);

function Day2Puzzle2() {
  return (
    <WrapperDay2Puzzle2>
      <div>--- Day 2 Puzzle 2 ---</div>
      <div>
        <a href="https://adventofcode.com/2021/day/2#part2">
          Link to problem statement
        </a>
      </div>
      <div>Answer is: {answer}</div>
    </WrapperDay2Puzzle2>
  );
}

export default Day2Puzzle2;
