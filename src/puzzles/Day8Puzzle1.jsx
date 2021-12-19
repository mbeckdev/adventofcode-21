import React, { useState, useEffect } from 'react';
import getAnswer, { splitUpData } from './Day8Puzzle1Logic.js';
// import Day8Puzzle1Logic from './Day8Puzzle1Logic.js';
// import exampleData from './puzzle-data/Day8-ExampleData.txt';
// import data from './puzzle-data/Day8-ExampleData.txt';
import data from './puzzle-data/Day8-Data.txt';

import styled from 'styled-components';

const WrapperDay8Puzzle1 = styled.div`
  border: 1px solid green;
`;

function Day8Puzzle1() {
  let url = data;

  const [answer, setAnswer] = useState(null);

  const [rawText, setRawText] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ************************
  // Functions
  // ************************

  let initialState = [];
  const gameLogic = () => {
    let answer = getAnswer(initialState);
    setAnswer(answer);
  };

  // ************************
  // Use Effects
  // ************************
  useEffect(() => {
    if (rawText) {
      initialState = splitUpData(rawText);

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
    <WrapperDay8Puzzle1 id="Day8-Puzzle1">
      <div>
        <span>
          --- Day8 Puzzle1 ---{' '}
          <a href="https://adventofcode.com/2021/day/8">
            Link to problem statement
          </a>
        </span>
      </div>

      <div>Day8Puzzle1 Answer is: {answer}</div>
    </WrapperDay8Puzzle1>
  );
}

export default Day8Puzzle1;
