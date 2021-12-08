import React from 'react';
import data from './Day3-Data.js';

import styled from 'styled-components';

const WrapperDay3Puzzle1 = styled.div`
  border: '1px solid green';
`;

const findAnswer = (theArray) => {
  let theAnswer = 0;

  let powerConsumption = 0;

  let gammaRate = '';
  let epsilonRate = '';

  // how many digits are these? 12
  let numberOfDigits = theArray[0].length;
  // console.log(numberOfDigits);

  let counterOfOnes = [];
  for (let j = 0; j < numberOfDigits; j++) {
    counterOfOnes.push(0);
  }
  // console.log('counterOfOnes', counterOfOnes); //[0,0,0,...]

  for (let i = 0; i < theArray.length; i++) {
    // for (let i = 0; i < 3; i++) {
    // let singleOrderArray = theArray[i].split(' '); // like ["forward", 8]
    // let direction = singleOrderArray[0];
    // let distance = Number(singleOrderArray[1]);

    for (let j = 0; j < numberOfDigits; j++) {
      let aDigit = theArray[i][j];

      if (aDigit === '1') {
        counterOfOnes[j]++;
      }

      // if (aDigit == 0) {
      // } else if (aDigit == 1) {
      // }

      // console.log(aDigit);
    }
  }

  let mostCommon1sOr0s = '';
  for (let j = 0; j < numberOfDigits; j++) {
    if (counterOfOnes[j] === theArray.length / 2) {
      // console.log('its even! need more code!');
    } else if (counterOfOnes[j] > theArray.length / 2) {
      mostCommon1sOr0s += '1';
    } else {
      mostCommon1sOr0s += '0';
    }
  }

  let gammaRateinBinary = mostCommon1sOr0s; //string
  let epsilonRateinBinary = '';

  for (let k = 0; k < gammaRateinBinary.length; k++) {
    // console.log('gammaRateinBinary[k]', gammaRateinBinary[k]);

    if (gammaRateinBinary[k] === '0') {
      epsilonRateinBinary += '1';
    } else {
      epsilonRateinBinary += '0';
    }
  }
  // console.log('epsilonRateinBinary---', epsilonRateinBinary);

  // console.log('gammaRateinBinary', gammaRateinBinary);
  gammaRate = parseInt(gammaRateinBinary, 2);
  epsilonRate = parseInt(epsilonRateinBinary, 2);

  // console.log('mostCommon1sOr0s', mostCommon1sOr0s);
  // console.log('counterofOnes end', counterOfOnes);
  // console.log('number of items', theArray.length);

  powerConsumption = gammaRate * epsilonRate;
  theAnswer = powerConsumption;
  return theAnswer;
};

let answer = findAnswer(data);

function Day3Puzzle1() {
  return (
    <WrapperDay3Puzzle1>
      <div>--- Day3 Puzzle1 ---</div>
      <div>
        <a href="https://adventofcode.com/2021/day/3">
          Link to problem statement
        </a>
      </div>
      <div>Answer is: {answer}</div>
    </WrapperDay3Puzzle1>
  );
}

export default Day3Puzzle1;
