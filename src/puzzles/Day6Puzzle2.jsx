import React, { useState, useEffect } from 'react';
// import exampleData from './puzzle-data/Day6-ExampleData.txt';
import data from './puzzle-data/Day6-Data.txt';

import styled from 'styled-components';

const WrapperDay6Puzzle2 = styled.div`
  border: 1px solid green;
`;

// ****************************************
// Helper classes here
// ****************************************

// ****************************************
// actual class/function to export
// ****************************************
function Day6Puzzle2() {
  // let url = exampleData;
  let url = data;
  // let url = rawText;

  const [answer, setAnswer] = useState(null);

  const [rawText, setRawText] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let initialState = [];

  //   //putting it in at 6's
  //   //D0 shift = 0, spots= [0,1,1,2,1,0,0], aLen=5, array=3,4,3,1,2
  //   //D1 shift = 1, spots= [0,1,1,2,1,0,0], aLen=5, array=2,3,2,0,1,
  //   //D2 shift = 2, spots= [0,1,1,2,1,0,0], aLen=6, array=1,2,1,6,0,8
  //   //D3 shift = 3, spots= [0,1,1,2,1,0,0], aLen=7, array=0,1,0,5,6,7,8
  //   //D4 shift = 4, spots= [0,1,1,3,1,0,0], aLen=9, array=6,0,6,4,5,6,7,8,8    ...put in the shift-1 spot of spots
  //   //D5 shift = 5, spots= [0,1,1,3,2,0,0], aLen=10, array=5,6,5,3,4,5,6,7,7,8

  //   // putting it in at 8's
  //   //D0 shift = 0, spots= [0,1,1,2,1,0,0], aLen=5,  subtract=[0,0,0,0,0,0,0] array=3,4,3,1,2
  //   //D1 shift = 1, spots= [0,1,1,2,1,0,0], aLen=5,  subtract=[0,0,0,0,0,0,0] array=2,3,2,0,1,
  //   //D2 shift = 2, spots= [0,1,1,2,1,0,0], aLen=6,  subtract=[0,1,0,0,0,0,0] array=1,2,1,6,0,8
  //   //add subtract[shift-1=1]++ //Len = 0+1+1+2+1+0+0   + 0+1+0+0+0+0+0 =6 //.. add to spot 3 and subtract 1 from amount to add to length in 2 turns
  //   //D3 shift = 3, spots= [0,1,1,2,1,0,0], aLen=7,  subtract=[0,1,1,0,0,0,0]
  //   //array=0,1,0,5,6,7,8 //add subtract[shift-1=2]++ //Len = sum(spots)+sum(subtract)=5+2=7
  //   //D4 shift = 4, spots= [0,1,1,3,1,0,0], aLen=9,  subtract=[0,0,1,2,0,0,0] array=6,0,6,4,5,6,7,8,8 //add subtract[shift-1=3] += oldspots[3]=2   ...put in the shift-1 spot of spots

  //   //D5 shift = 5, spots= [0,1,1,3,2,0,0], aLen=10, subtract=[0,0,0,1,0,0,0] array=5,6,5,3,4,5,6,7,7,8
  // };

  const getNumberOfFish = (initialArray, daysLeft) => {
    //moving spots

    // day0 spots = [0,1,1,2,1,0,0,      0,0] becasue array = 3,4,3,1,2
    // day1 spots = [1,1,2,1,0,0,0,      0,0]
    // day2 spots = [1,2,1,0,0,0,1,      0,1]
    // day3 spots = [2,1,0,0,0,1,1,      1,1]
    // day4 spots = [1,0,0,0,1,1,2+1,    1,2]
    // day5 spots = [0,0,0,1,1,2+1,1+1,  2,1]   so array day 5 = len 10. yup

    let tempSpots = new Array(9).fill(0); //[0,0,0,0,0,0,0,0,0]

    //turn initialArray into 8array
    for (let i = 0; i < initialArray.length; i++) {
      tempSpots[initialArray[i]]++;
    }

    console.log('initial tempSpots', tempSpots);

    // let tempSpots = [0, 1, 1, 2, 1, 0, 0, 0, 0];

    for (let i = 0; i < daysLeft; i++) {
      let prevSpot8 = tempSpots[8]; //0
      let prevSpot7 = tempSpots[7]; //0
      let prevSpot6 = tempSpots[6]; //0
      let prevSpot0 = tempSpots[0]; //1

      // console.log('daysLeft in for loop', daysLeft - i, 'tempSpots', tempSpots);

      // last 2 spots
      //is spots8[0] not a 0?
      // if (prevSpot0 === 0) {
      //   tempSpots[8] = 0;
      // } else {
      // }
      tempSpots[8] = prevSpot0;
      tempSpots[7] = prevSpot8;

      // first 6 spots changed.
      tempSpots[6] = prevSpot0 + prevSpot7;

      // spots 0 through 4
      for (let j = 0; j < 5; j++) {
        tempSpots[j] = tempSpots[j + 1];
        console.log('j', j);
      }

      // spot 5 - must go after the for loop above
      tempSpots[5] = prevSpot6;

      // console.log(tempSpots);
      console.log('day:', i + 1, 'tempSpots', tempSpots);
    }
    let length = 0;
    for (let i = 0; i < tempSpots.length; i++) {
      length += tempSpots[i];
    }
    return length;
  };

  function getAnswer() {
    let numberOfDaysLater = 256;
    let theAnswer = 123456789;

    //initialState is array from data
    // theAnswer = getNumberOfFish([3, 4, 3, 1, 2], numberOfDaysLater);
    theAnswer = getNumberOfFish(initialState, numberOfDaysLater);
    console.log('answer..... = ', theAnswer);

    return theAnswer;
  }

  const gameLogic = () => {
    let answer = getAnswer();
    setAnswer(answer);
  };

  const splitUpData = () => {
    // console.log('splitting up data');
    // let arrayOfLines = rawText.split('\r\n');
    let initialArrayInText = rawText.split(',');
    console.log('initialArrayInText', initialArrayInText);

    for (let i = 0; i < initialArrayInText.length; i++) {
      initialState.push(Number(initialArrayInText[i]));
    }
    console.log('initialState', initialState);
  };

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
        console.log('settingRawText');
      })
      .catch((error) => {
        console.error('Error fetching rawText: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
        console.log('loading complete!');
      });
  }, [url]);
  if (loading) return 'Loading...';
  if (error) return 'Error!';

  return (
    <WrapperDay6Puzzle2 id="Day6-Puzzle2">
      <div>
        <span>
          --- Day6 Puzzle2 ---{' '}
          <a href="https://adventofcode.com/2021/day/6">
            Link to problem statement
          </a>
        </span>
      </div>

      <div>Day6Puzzle2 Answer is: {answer}</div>

      {/* <div>{rawText}</div> */}
    </WrapperDay6Puzzle2>
  );
}

export default Day6Puzzle2;
