import React, { useState, useEffect } from 'react';
// import exampleData from './puzzle-data/Day7-ExampleData.txt';
// import data from './puzzle-data/Day7-ExampleData.txt';
import data from './puzzle-data/Day7-Data.txt';

import styled from 'styled-components';

const WrapperDay7Puzzle2 = styled.div`
  border: 1px solid green;
`;

function Day7Puzzle2() {
  let url = data;

  const [answer, setAnswer] = useState(null);

  const [rawText, setRawText] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let initialState = [];

  // ************************
  // Functions
  // ************************

  const getTempFuel = (distance) => {
    let tempFuel = 0;
    for (let i = 0; i < distance + 1; i++) {
      tempFuel += i;
    }
    return tempFuel;
  };

  function getAnswer() {
    let theAnswer = 0;

    // Find min and max of initial array
    let min = Math.min(...initialState);
    let max = Math.max(...initialState);

    let distanceToFuelLookup = { 0: 0, 1: 1, 2: 3 };

    let distances = [];
    let fuelPerSpot = [];
    // from the smallest number in the array to the largest   0 to 16
    for (let i = min; i < max; i++) {
      //find an array of distances from 0 (i)

      let thisFuel = 0;
      let thisFuelSummed = 0;
      // for each number in the initialstate array, how far is it from the index?

      for (let j = 0; j < initialState.length; j++) {
        thisFuel = 0;
        let distance = Math.abs(initialState[j] - i);

        // expand the distanceToFuelLookup table if that item doesn't exist.
        if (!distanceToFuelLookup[distance]) {
          distanceToFuelLookup[distance] = getTempFuel(distance);
        }
        thisFuel = distanceToFuelLookup[distance];
        thisFuelSummed += thisFuel;
      }
      fuelPerSpot.push(thisFuelSummed);
      distances.push(thisFuelSummed);
    }

    //find the index of the smallest one in distances
    let smallestFuel = Math.min(...fuelPerSpot);
    let index = fuelPerSpot.indexOf(smallestFuel);
    // console.log('smallestfuel', smallestFuel, ' at index', index);

    // set answer
    theAnswer = smallestFuel;
    return theAnswer;
  }

  const gameLogic = () => {
    let answer = getAnswer();
    setAnswer(answer);
  };

  const splitUpData = () => {
    let initialArrayInText = rawText.split(',');

    for (let i = 0; i < initialArrayInText.length; i++) {
      initialState.push(Number(initialArrayInText[i]));
    }
  };

  // ************************
  // Use Effects
  // ************************
  useEffect(() => {
    if (rawText) {
      splitUpData();
      gameLogic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawText]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw response;
      })
      .then((rawText) => {
        setRawText(rawText);
        // console.log('settingRawText');
      })
      .catch((error) => {
        console.error('Error fetching rawText: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
        // console.log('loading complete!');
      });
  }, [url]);
  if (loading) return 'Loading...';
  if (error) return 'Error!';

  // ************************
  // Rendering
  // ************************
  return (
    <WrapperDay7Puzzle2 id="Day7-Puzzle2">
      <div>
        <span>
          --- Day7 Puzzle2 ---{' '}
          <a href="https://adventofcode.com/2021/day/7">
            Link to problem statement
          </a>
        </span>
      </div>

      <div>Day7Puzzle2 Answer is: {answer}</div>
    </WrapperDay7Puzzle2>
  );
}

export default Day7Puzzle2;
