import React, { useState, useEffect } from 'react';
// import exampleData from './puzzle-data/Day6-ExampleData.txt';
import data from './puzzle-data/Day6-Data.txt';

import styled from 'styled-components';

const WrapperDay6Puzzle1 = styled.div`
  border: 1px solid green;
`;

// ****************************************
// Helper classes here
// ****************************************

// ****************************************
// actual class/function to export
// ****************************************
function Day6Puzzle1() {
  // let url = exampleData;
  let url = data;
  // let url = rawText;

  const [answer, setAnswer] = useState(null);

  const [rawText, setRawText] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let initialState = [];

  const getNewDay = (previousDay, daysLeft) => {
    // console.log('GETTING NEW DAY');

    let tempArray = [...previousDay];

    let numberOfNewFishToAddToday = 0;
    for (let i = 0; i < previousDay.length; i++) {
      if (previousDay[i] === 0) {
        numberOfNewFishToAddToday++;
        // change this day from 0 previously to 6 in newday
        tempArray[i] = 6;
      } else {
        tempArray[i] = tempArray[i] - 1;
      }
    }
    for (let i = 0; i < numberOfNewFishToAddToday; i++) {
      tempArray.push(8);
    }

    if (daysLeft - 1 <= 0) {
      return tempArray;
    } else {
      let tempDaysLeft = daysLeft;
      tempDaysLeft--;
      return getNewDay(tempArray, tempDaysLeft);
    }
  };

  // const getLanternfish = (numberOfDaysSinceInitial) => {
  //   console.log('getting lanternfish');

  //   // getNewDay(getNewDay(getNewDay(initialState)))

  //   let tempArray = getNewDay(initialState, numberOfDaysSinceInitial);
  //   console.log('tempArray', tempArray);
  //   return tempArray;
  // };

  function getAnswer() {
    let theAnswer = 123456789;
    // let day1 = getNewDay(initialState);
    // let day2 = getNewDay(day1);
    // console.log('initialState', initialState);
    // console.log('getNewDay(initialState)', getNewDay(initialState));
    // console.log('day2', day2);

    let lastNumber = 80;
    // theAnswer = getLanternfish(lastNumber);

    theAnswer = getNewDay(initialState, lastNumber);
    // console.log(
    //   'answer============ getlandernfish(',
    //   lastNumber,
    //   ')',
    //   theAnswer
    // );
    let lol = theAnswer.length;
    console.log('answer length', lol);
    return lol;
  }

  const gameLogic = () => {
    let answer = getAnswer();
    setAnswer(answer);
    // console.log('answer============', answer);
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
    <WrapperDay6Puzzle1 id="Day6-Puzzle1">
      <div>
        <span>
          --- Day6 Puzzle1 ---{' '}
          <a href="https://adventofcode.com/2021/day/6">
            Link to problem statement
          </a>
        </span>
      </div>

      <div>Day6Puzzle1 Answer is: {answer}</div>

      {/* <div>{rawText}</div> */}
    </WrapperDay6Puzzle1>
  );
}

export default Day6Puzzle1;
