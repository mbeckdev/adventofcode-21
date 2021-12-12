import React, { useState, useEffect } from 'react';
// import exampleData from './Day5-ExampleData.txt';
import data from './Day5-Data.txt';

import styled from 'styled-components';

const WrapperDay5Puzzle1 = styled.div`
  border: 1px solid green;
`;

// ****************************************
// Helper classes here
// ****************************************
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getX() {
    return this.x;
  }
}
// let dur = new Point(1, 2);
// console.log(dur.x, dur.y, 'example points');

class Vector {
  constructor(startPoint, endPoint) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  checkIfOnlyXsAreSame() {
    // check if x's are the same
    let p1YToP2YDirection = 0; // 1 or -1, 0 if same
    if (
      this.startPoint.x === this.endPoint.x &&
      this.startPoint.y !== this.endPoint.y
    ) {
      // console.log('same X numbers!');

      //Check direction of y points
      if (this.endPoint.y > this.startPoint.y) {
        p1YToP2YDirection = 1;
      } else if (this.endPoint.y < this.startPoint.y) {
        p1YToP2YDirection = -1;
      } else {
        // y's are the same
        p1YToP2YDirection = 0;
      }

      // Set points into a new array
      let tempArray = [];
      // console.log('p1YToP2YDirection', p1YToP2YDirection);

      let numberOfPoints =
        Math.abs(this.startPoint.y + this.endPoint.y * -1) + 1;
      // let numberOfPoints =
      // this.startPoint.y + this.endPoint.y * p1YToP2YDirection + 1;

      // let numberOfPoints = Math.abs(this.endPoint.y - this.startPoint.y) + 1;
      // console.log('numberOfPoints', numberOfPoints);

      // for each point, add it to a temp array
      for (let i = 0; i < numberOfPoints; i++) {
        let tempPoint = new Point(
          this.startPoint.x,
          this.startPoint.y + i * p1YToP2YDirection
        );

        // console.log('tempPoint', tempPoint);
        tempArray.push(tempPoint);
      }
      // console.log('tempArray', tempArray);
      this.myPoints = [...tempArray];
      // console.log('this.myPoints', this.myPoints);
    }
  }

  checkIfOnlyYsAreSame() {
    // check if y's are the same
    let p1XToP2XDirection = 0; // 1 or -1, 0 if same
    if (
      this.startPoint.y === this.endPoint.y &&
      this.startPoint.x !== this.endPoint.x
    ) {
      // console.log('same Y numbers!', this.startPoint, this.endPoint);

      //Check direction of X points
      if (this.endPoint.x > this.startPoint.x) {
        p1XToP2XDirection = 1;
      } else if (this.endPoint.x < this.startPoint.x) {
        p1XToP2XDirection = -1;
      } else {
        // X's are the same
        p1XToP2XDirection = 0;
      }

      // Set points into a new array
      let tempArray = [];
      // console.log('p1XToP2XDirection', p1XToP2XDirection);

      let numberOfPoints =
        Math.abs(this.startPoint.x + this.endPoint.x * -1) + 1;
      // let numberOfPoints = Math.abs(this.endPoint.x - this.startPoint.x) + 1;
      // console.log('numberOfPoints', numberOfPoints);

      // for each point, add it to a temp array
      for (let i = 0; i < numberOfPoints; i++) {
        let tempPoint = new Point(
          this.startPoint.x + i * p1XToP2XDirection,
          this.startPoint.y
        );

        // console.log('tempPoint', tempPoint);
        tempArray.push(tempPoint);
      }
      // console.log('tempArray', tempArray);
      this.myPoints = [...tempArray];
      // console.log('this.myPoints', this.myPoints);
    }
  }

  getAllPoints() {
    // console.log('getting all points');

    //Find this.myPoints = an array of points depending on
    this.checkIfOnlyXsAreSame();
    this.checkIfOnlyYsAreSame();

    // Note:
    // still doesn't work for points that are 1 length long
    // still doesn't work for diagonals
  }
}

// ****************************************
// actual class/function to export
// ****************************************
function Day5Puzzle1() {
  // let url = exampleData;
  let url = data;
  // let url = rawText;

  const [answer, setAnswer] = useState(null);

  const [rawText, setRawText] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log('d5p1 start function');

  let arrayOfVectors = [];
  let rawTextXsArray = [];
  let rawTextYsArray = [];
  // we only need to do this once, so no need for a class.
  function getBoard(arrayOfVectors) {
    // return a 2d array of integers
    // pseudocode:
    //     //   for all points, add to the board 2d array

    // What size of empty board do we need? Smallest
    let biggestXValue = 0;
    let biggestYValue = 0;
    for (let i = 0; i < rawTextXsArray.length; i++) {
      if (rawTextXsArray[i] > biggestXValue) {
        biggestXValue = rawTextXsArray[i];
      }
    }

    for (let i = 0; i < rawTextYsArray.length; i++) {
      if (rawTextYsArray[i] > biggestYValue) {
        biggestYValue = rawTextYsArray[i];
      }
    }

    //

    // set board to a 10x10 grid of 0's
    let board = new Array(biggestYValue + 1)
      .fill(0)
      .map(() => new Array(biggestXValue + 1).fill(0));
    // console.log('initial board', board);

    // for each vector:
    for (let i = 0; i < arrayOfVectors.length; i++) {
      // for each point in a vector:
      // console.log('i', i, 'arrayOfVectors[i]', arrayOfVectors[i]);
      // console.log('arrayOfVectors', arrayOfVectors);
      // console.log('i', i);
      // console.log('arrayOfVectors[0]', arrayOfVectors[0]);
      // console.log('arrayOfVectors[i]', arrayOfVectors[i]);

      // we don't have all myPoints for all vectors, so this is a check
      //  currently only checking vectors that are horizontal or vertical
      if (arrayOfVectors[i].myPoints) {
        // for each point in a vector
        for (let j = 0; j < arrayOfVectors[i].myPoints.length; j++) {
          let thisPoint = arrayOfVectors[i].myPoints[j];
          board[thisPoint.x][thisPoint.y] += 1;

          // console.log(thisPoint.x, thisPoint.y, 'added to board');
          // console.log('board[i][j]', board[i][j]);
          // console.log(
          //   'board[thisPoint.x][thisPoint.y]',
          //   board[thisPoint.x][thisPoint.y]
          // );
        }
        // console.log('b');
      }
      // console.log('c');
    }

    // console.log('board in getboard before returning', board);
    return board;
  }

  function getAnswer(board) {
    //Determine number of points where at least two lines overlap
    // for (let i=0; i<board.length; i++) {

    // console.log('board in getAnswer', board);

    // for each point, is it a 2 or higher?
    let twoOrHigherCounter = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] >= 2) {
          twoOrHigherCounter++;
        }
      }
    }

    let theAnswer = twoOrHigherCounter;
    // setAnswer(theAnswer);
    return theAnswer;
    // }
  }

  const gameLogic = () => {
    // console.log('game logic starts');
    // let aBoard = getBoard(arrayOfVectors);
    let answer = getAnswer(getBoard(arrayOfVectors));
    setAnswer(answer);
    // console.log('answer = ', answer);
    // console.log('aBoard', aBoard);
  };

  const splitUpData = () => {
    // console.log('splitting up data');
    let arrayOfLines = rawText.split('\r\n');
    // console.log('arrayOfLines', arrayOfLines);
    // arrayOfLines looks like "['0,9 -> 5,9','8,0 -> 0,8',...]"
    // arrayOfLines looks like "['419,207 -> 419,109','300,888 -> 803,385',...,16,878 -> 835,59]"
    // for each line of arrayOfLines
    for (let i = 0; i < arrayOfLines.length; i++) {
      // threeLineThings = an array that looks like ['419,207','->','419,109']
      let threeLineThings = arrayOfLines[i].split(' ');
      let point1AsText = threeLineThings[0].split(',');
      let point2AsText = threeLineThings[2].split(',');
      // console.log(point1AsText);
      // point1AsText is an array ['419','207']
      let x1 = Number(point1AsText[0]);
      let y1 = Number(point1AsText[1]);
      let x2 = Number(point2AsText[0]);
      let y2 = Number(point2AsText[1]);

      rawTextXsArray.push(x1);
      rawTextXsArray.push(x2);
      rawTextYsArray.push(y1);
      rawTextYsArray.push(y2);

      let point1 = new Point(x1, y1);
      let point2 = new Point(x2, y2);

      let vectorA = new Vector(point1, point2);
      // console.log('p1XTo', 'vectorA', vectorA, 'i', i, 'p1XTo');
      vectorA.getAllPoints();

      //Add all vectors to arrayOfVectors
      arrayOfVectors.push(vectorA);
    }
  };

  useEffect(() => {
    if (rawText) {
      // console.log('setting durt to 4');
      splitUpData();
      // getBoard(arrayOfVectors);
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
        // console.error('Error fetching rawText: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
        // console.log('loading complete!');
      });
  }, [url]);
  if (loading) return 'Loading...';
  if (error) return 'Error!';

  return (
    <WrapperDay5Puzzle1 id="Day5-Puzzle1">
      <div>--- Day5 Puzzle1 ---</div>
      <div>
        <a href="https://adventofcode.com/2021/day/5">
          Link to problem statement
        </a>
      </div>
      <div>Day5Puzzle1 Answer is: {answer}</div>

      {/* <div>{rawText}</div> */}
    </WrapperDay5Puzzle1>
  );
}

export default Day5Puzzle1;
