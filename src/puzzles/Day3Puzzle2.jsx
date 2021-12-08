'use strict';
import React from 'react';
import data from './Day3-Data.js';

import styled from 'styled-components';

const WrapperDay3Puzzle2 = styled.div`
  border: '1px solid green';
`;

const exampleData = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
];

const findJustBitsAtPosition = (arrayToCheck, index) => {
  let justBits = [];

  // Find an array with only the first bits

  // loop through array of numbers
  for (let i = 0; i < arrayToCheck.length; i++) {
    justBits.push(arrayToCheck[i][index]);
  }
  console.log('position ', index, ' justBits =', justBits);

  return justBits;
};

// given an array and digit position - return a smaller array.

const mostCommonNumber = (someArray) => {
  // in the first bits...
  // is 1 more common than 0?
  let numberOfOnesInSet = 0;
  let numberOfZerosInSet = 0;
  for (let i = 0; i < someArray.length; i++) {
    console.log('someArray', someArray);

    if (someArray[i] === '1') {
      numberOfOnesInSet++;
    } else if (someArray[i] === '0') {
      numberOfZerosInSet++;
    }
  }

  // mostCommonNumber = '0' or '1' or 'neither'
  let mostCommonNumber = '';
  if (numberOfOnesInSet > numberOfZerosInSet) {
    mostCommonNumber = '1';
  } else if (numberOfZerosInSet > numberOfOnesInSet) {
    mostCommonNumber = '0';
  } else {
    mostCommonNumber = 'neither';
  }

  console.log('most common number = ', mostCommonNumber);
  return mostCommonNumber;
};

const leastCommonNumber = (someArray) => {
  // in the first bits...
  // is 1 more common than 0?
  let numberOfOnesInSet = 0;
  let numberOfZerosInSet = 0;
  for (let i = 0; i < someArray.length; i++) {
    console.log('someArray', someArray);

    if (someArray[i] === '1') {
      numberOfOnesInSet++;
    } else if (someArray[i] === '0') {
      numberOfZerosInSet++;
    }
  }

  // mostCommonNumber = '0' or '1' or 'neither'
  let leastCommonNumber = '';
  if (numberOfOnesInSet < numberOfZerosInSet) {
    leastCommonNumber = '1';
  } else if (numberOfZerosInSet < numberOfOnesInSet) {
    leastCommonNumber = '0';
  } else {
    leastCommonNumber = 'neither';
  }

  console.log('most common number = ', leastCommonNumber);
  return leastCommonNumber;
};

const filterList = (anArray, mostCommonNumber, oxygenOrCO2, aDigit) => {
  console.log(
    '--filterList start, anArray, mostCommonNumber, oxygenOrCO2',
    anArray,
    mostCommonNumber,
    oxygenOrCO2
  );
  let newArray = [];
  // if (eachDigitMostCommon[0] === 1) {
  if (mostCommonNumber === '1') {
    newArray = anArray.filter((item) => item[aDigit] === '1');
  } else if (mostCommonNumber === '0') {
    newArray = anArray.filter((item) => item[aDigit] === '0');
  } else {
    // it's a tie, for oxygen, this is correct.
    if (oxygenOrCO2 === 'oxygen') {
      newArray = anArray.filter((item) => item[aDigit] === '1');
    } else if (oxygenOrCO2 === 'CO2') {
      newArray = anArray.filter((item) => item[aDigit] === '0');
    } else {
      console.log('oxygenOrCO2 name error. oxygenOrCO2=', oxygenOrCO2);
    }
  }

  return newArray;
};

// digit starts at 0, goes until digit == 5, because that'll be after all digits are checked - for example set
// recursive!!!!!!
const findFilteredArray = (startArray, digit, oxygenOrCO2) => {
  // example data and , 0
  let endArray = [];

  console.log('findFilteredArray startArray', startArray);
  console.log('findFilteredArray startArray[0].length', startArray[0].length);

  if (startArray.length === 1) {
    console.log(
      'findFilteredArray - ending - startArray.length',
      startArray.length,
      ' digit = ',
      digit
    );
    return startArray;
    // return 'dog';
  } else if (digit === startArray[0].length - 1) {
    console.log(
      'findFilteredArray - digit is last one - startArray.length',
      startArray.length,
      ' digit = ',
      digit
    );
    let allTheBitsAtAPosition = [];
    // // Find an array with only the first bits
    allTheBitsAtAPosition = findJustBitsAtPosition(startArray, digit);
    console.log('allTheBitsAtAPosition', allTheBitsAtAPosition);

    let theCommonNumber;
    if (oxygenOrCO2 === 'oxygen') {
      theCommonNumber = mostCommonNumber(allTheBitsAtAPosition);
    } else {
      theCommonNumber = leastCommonNumber(allTheBitsAtAPosition);
    }

    console.log(
      'findFilteredArray theMostCommonNumber',
      theCommonNumber,
      ' at digit',
      digit
    );

    // if 1 is more common: keep all the numbers starting with 1
    console.log('#1 oxygenOrCO2', oxygenOrCO2);
    let newArray = filterList(startArray, theCommonNumber, oxygenOrCO2, digit);

    console.log('findFilteredArray (at end) newArray', newArray);
    /////
    // return 'dog';
    return newArray;
  } else {
    let allTheBitsAtAPosition = [];
    // // Find an array with only the first bits
    allTheBitsAtAPosition = findJustBitsAtPosition(startArray, digit);
    console.log('allTheBitsAtAPosition', allTheBitsAtAPosition);

    let theCommonNumber;
    if (oxygenOrCO2 === 'oxygen') {
      theCommonNumber = mostCommonNumber(allTheBitsAtAPosition);
    } else {
      theCommonNumber = leastCommonNumber(allTheBitsAtAPosition);
    }

    console.log(
      'findFilteredArray theMostCommonNumber',
      theCommonNumber,
      ' at digit',
      digit
    );

    // if 1 is more common: keep all the numbers starting with 1
    let newArray = filterList(startArray, theCommonNumber, oxygenOrCO2, digit);

    console.log('findFilteredArray (at end) newArray', newArray);
    /////

    return findFilteredArray(newArray, digit + 1, oxygenOrCO2);
  }
};

const findOxygenGeneratorRating = (theArray) => {
  console.log('theArray -eeeeee', theArray);
  let answer = findFilteredArray(theArray, 0, 'oxygen');
  console.log('findOxygenGeneratorRating answer =', answer);
  return answer;
};

const findCO2ScrubberRating = (theArray) => {
  console.log('theArray -eeeeee', theArray);
  let answer = findFilteredArray(theArray, 0, 'CO2');
  console.log('findOxygenGeneratorRating answer =', answer);
  return answer;
};

const findAnswer = (theArray) => {
  let theAnswer = 0;
  let oxygenGeneratorRatingInBinary = findOxygenGeneratorRating(theArray);
  let oxygenGeneratorRating = parseInt(oxygenGeneratorRatingInBinary, 2);
  console.log('0000000000000000000000000000000000');
  let cO2ScrubberRatingInBinary = findCO2ScrubberRating(theArray);
  let cO2ScrubberRating = parseInt(cO2ScrubberRatingInBinary, 2);

  console.log(
    'oxygenGeneratorRatingInBinary = ',
    oxygenGeneratorRatingInBinary
  );
  console.log('oxygenGeneratorRating = ', oxygenGeneratorRating);
  console.log('cO2ScrubberRatingInBinary = ', cO2ScrubberRatingInBinary);
  console.log('cO2ScrubberRating = ', cO2ScrubberRating);

  theAnswer = oxygenGeneratorRating * cO2ScrubberRating;

  // let c02ScrubberRating = 0;
  // let lifeSupportRating = oxygenGeneratorRating * c02ScrubberRating;
  // theAnswer = lifeSupportRating;

  return theAnswer;
};

let answer = findAnswer(data);
// let answer = findAnswer(exampleData);
// let answer = findFilteredArray(exampleData, 0);

function Day3Puzzle2() {
  return (
    <WrapperDay3Puzzle2>
      <div>--- Day3 Puzzle2 ---</div>
      <div>
        <a href="https://adventofcode.com/2021/day/3#part2">
          Link to problem statement
        </a>
      </div>
      <div>Answer is: {answer}</div>
    </WrapperDay3Puzzle2>
  );
}

export default Day3Puzzle2;
