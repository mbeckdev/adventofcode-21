import React, { useState, useEffect } from 'react';
import exampleData from './Day5-ExampleData.txt';
// import data from './Day5-Data.txt';

import styled from 'styled-components';

const WrapperDay5Puzzle1 = styled.div`
  border: 1px solid green;
`;

let badAnswer = 1234;

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
let dur = new Point(1, 2);
console.log(dur.x, dur.y, 'example points');

class Vector {
  constructor(startPoint, endPoint) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  checkIfOnlyXsAreSame() {
    // check if x's are the same
    let p1YToP2YDirection = 0; // 1 or -1, 0 if same
    let isYEndGreaterThanYStart = null;
    let isYEndEqualToYStart = null;
    if (
      this.startPoint.x === this.endPoint.x &&
      this.startPoint.y !== this.endPoint.y
    ) {
      console.log('same X numbers!');

      //Check direction of y points
      if (this.endPoint.y > this.startPoint.y) {
        isYEndGreaterThanYStart = true;
        p1YToP2YDirection = 1;
      } else if (this.endPoint.y < this.startPoint.y) {
        isYEndGreaterThanYStart = false;
        p1YToP2YDirection = -1;
      } else {
        // y's are the same
        isYEndGreaterThanYStart = null;
        isYEndEqualToYStart = true;
        p1YToP2YDirection = 0;
      }

      // Set points into a new array
      let tempArray = [];
      console.log('p1YToP2YDirection', p1YToP2YDirection);
      let numberOfPoints =
        this.startPoint.y + this.endPoint.y * p1YToP2YDirection + 1;
      // let numberOfPoints = Math.abs(this.endPoint.y - this.startPoint.y) + 1;
      console.log('numberOfPoints', numberOfPoints);

      // for each point, add it to a temp array
      for (let i = 0; i < numberOfPoints; i++) {
        let tempPoint = new Point(
          this.startPoint.x,
          this.startPoint.y + i * p1YToP2YDirection
        );

        console.log('tempPoint', tempPoint);
        tempArray.push(tempPoint);
      }
      console.log('tempArray', tempArray);
      this.myPoints = [...tempArray];
      console.log('this.myPoints', this.myPoints);
    }
  }

  checkIfOnlyYsAreSame() {
    // check if y's are the same
    let p1XToP2XDirection = 0; // 1 or -1, 0 if same
    let isXEndGreaterThanXStart = null;
    let isXEndEqualToXStart = null;
    if (
      this.startPoint.y === this.endPoint.y &&
      this.startPoint.x !== this.endPoint.x
    ) {
      console.log('same Y numbers!', this.startPoint, this.endPoint);

      //Check direction of X points
      if (this.endPoint.x > this.startPoint.x) {
        isXEndGreaterThanXStart = true;
        p1XToP2XDirection = 1;
      } else if (this.endPoint.x < this.startPoint.x) {
        isXEndGreaterThanXStart = false;
        p1XToP2XDirection = -1;
      } else {
        // X's are the same
        isXEndGreaterThanXStart = null;
        isXEndEqualToXStart = true;
        p1XToP2XDirection = 0;
      }

      // Set points into a new array
      let tempArray = [];
      console.log('p1XToP2XDirection', p1XToP2XDirection);
      let numberOfPoints =
        this.startPoint.x + this.endPoint.x * p1XToP2XDirection + 1;
      // let numberOfPoints = Math.abs(this.endPoint.x - this.startPoint.x) + 1;
      console.log('numberOfPoints', numberOfPoints);

      // for each point, add it to a temp array
      for (let i = 0; i < numberOfPoints; i++) {
        let tempPoint = new Point(
          this.startPoint.x + i * p1XToP2XDirection,
          this.startPoint.y
        );

        console.log('tempPoint', tempPoint);
        tempArray.push(tempPoint);
      }
      console.log('tempArray', tempArray);
      this.myPoints = [...tempArray];
      console.log('this.myPoints', this.myPoints);
    }
  }

  getAllPoints() {
    console.log('getting all points');

    //Find this.myPoints = an array of points depending on
    this.checkIfOnlyXsAreSame();
    this.checkIfOnlyYsAreSame();

    // Note:
    // still doesn't work for points that are 1 length long
    // still doesn't work for diagonals
  }
}

// class board {
//   // a board 10x10 in example data that
//   // holds numbers, 1 for each hit of a point from vectors
//   //
//   constructor(arrayOfVectors) {
//     this.arrayOfVectors = arrayOfVectors;
//   }

//   getBoard() {
//     // return a 2d array of integers

//     // pseudocode:
//     //   for all points, add to the board
//     //   set this.board
//   }
// }

// ****************************************
// actual class/function to export
// ****************************************
function Day5Puzzle1() {
  let url = exampleData;
  // let url = rawText;

  let huhAnswer = badAnswer;
  const [answer, setAnswer] = useState(null);

  const [rawText, setrawText] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('d5p1 start function');

  let arrayOfVectors = [];

  // we only need to do this once, so no need for a class.
  function getBoard(arrayOfVectors) {
    // return a 2d array of integers
    // pseudocode:
    //     //   for all points, add to the board 2d array

    // set board to a 10x10 grid of 0's
    let board = new Array(10).fill(0).map(() => new Array(10).fill(0));
    console.log('initial board', board);

    // for each vector:
    for (let i = 0; i < arrayOfVectors.length; i++) {
      // for each point in a vector:
      console.log('arrayOfVectors', arrayOfVectors);
      console.log('i', i);
      console.log('arrayOfVectors[0]', arrayOfVectors[0]);
      console.log('arrayOfVectors[i]', arrayOfVectors[i]);

      // we don't have all myPoints for all vectors, so this is a check
      //  currently only checking vectors that are horizontal or vertical
      if (arrayOfVectors[i].myPoints) {
        // for each point in a vector
        for (let j = 0; j < arrayOfVectors[i].myPoints.length; j++) {
          let thisPoint = arrayOfVectors[i].myPoints[j];
          board[thisPoint.x][thisPoint.y] += 1;

          console.log('board[i][j]', board[i][j]);
          console.log(
            'board[thisPoint.x][thisPoint.y]',
            board[thisPoint.x][thisPoint.y]
          );
        }
      }
    }

    console.log('board', board);
    return board;
  }

  function getAnswer(board) {
    //Determine number of points where at least two lines overlap
    // for (let i=0; i<board.length; i++) {
    console.log('lol');

    let theAnswer = 0;
    setAnswer(theAnswer);
    return 'lol';
    // }
  }
  const gameLogic = () => {
    console.log('game logic starts');
    let answer = getAnswer(getBoard(arrayOfVectors));
    console.log('answer = ', answer);
  };

  const splitUpData = () => {
    console.log('splitting up data');
    let arrayOfLines = rawText.split('\r\n');
    // console.log('arrayOfLines', arrayOfLines);
    // arrayOfLines looks like "['0,9 -> 5,9','8,0 -> 0,8',...]"
    // for each line of arrayOfLines
    for (let i = 0; i < arrayOfLines.length; i++) {
      let endOfStringIndex = arrayOfLines[0].length;
      let point1AsText = arrayOfLines[i].slice(0, 3);
      let point2AsText = arrayOfLines[i].slice(
        endOfStringIndex - 3,
        endOfStringIndex
      );
      // console.log(
      //   'point1astext, point2astext',
      //   '-',
      //   point1AsText,
      //   '-',
      //   '-',
      //   point2AsText,
      //   '-'
      // );
      let x1 = Number(point1AsText.slice(0, 1));
      let y1 = Number(point1AsText.slice(2, 3));
      // console.log('x1', x1, 'y1', y1);
      let x2 = Number(point2AsText.slice(0, 1));
      let y2 = Number(point2AsText.slice(2, 3));
      // console.log('x2', x2, 'y2', y2);
      let point1 = new Point(x1, y1);
      let point2 = new Point(x2, y2);
      // console.log('point1 and point2', point1, point2);
      let vectorA = new Vector(point1, point2);
      // console.log('vector', vectorA);
      // console.log(vectorA.getAllPoints());

      //Add all vectors to arrayOfVectors
      arrayOfVectors.push(vectorA);
    }
  };

  const [durt, setDurt] = useState(0);
  useEffect(() => {
    if (rawText) {
      console.log('setting durt to 4');
      splitUpData();
      // getBoard(arrayOfVectors);
      gameLogic();
    }
    setDurt(4);
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
        setrawText(rawText);
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
  }, []);
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
      <div>
        {/* D4P2 Answer is: {huhAnswer} - not this, check console.log answer */}
        Day5Puzzle1 Answer is: {answer}
      </div>
      <div>{durt}</div>
      <div>
        {/* <img src={data.results[0].picture.medium} />
         */}
        {rawText}
      </div>
    </WrapperDay5Puzzle1>
  );
}

export default Day5Puzzle1;

//pseudo code
//

// class User {
//   constructor(name) {
//     this.name = name;
//   }

//   sayHi() {
//     // alert(this.name);
//     console.log(this.name);
//   }
// }
// let user = new User('John');
// user.sayHi();

// const splitUpData = () => {
//   let arrayOfLines = rawText.split('\r\n');

//   balls = arrayOfLines[0].split(',');
//   for (let i = 0; i < balls.length; i++) {
//     balls[i] = Number(balls[i]);
//   }

//   let notTop2Lines = arrayOfLines.slice(2);

//   // let boards = [];

//   //cycle through each board.
//   for (let i = 0; i < notTop2Lines.length; i += 6) {
//     // let tempBoard = [[],[],[]],[[],[],[]],[[],[],[]]  except 5x5
//     // let tempBoard = [Row1Array, Row2Array, Row3Array and so on]
//     let tempBoard = [];
//     // console.log('i', i);

//     //cycle through each line of text for the next 5 lines.

//     for (let k = 0; k < 5; k++) {
//       // notTop2Lines[0] = "22 13 17 11  0"
//       let rowText = notTop2Lines[i + k];

//       // find the row Array
//       let rowArray = [];
//       for (let j = 0; j < rowText.length; j += 3) {
//         let thisNumber = rowText[j].concat(rowText[j + 1]);
//         // console.log('number = -' + thisNumber + '-');
//         if (thisNumber[0] === ' ') {
//           thisNumber = thisNumber[1];
//         }
//         thisNumber = Number(thisNumber);
//         rowArray.push(thisNumber);
//         // add this number to part of the row
//       }
//       // add rowArray to tempBoard
//       tempBoard.push(rowArray);

//       // general pseudo code notes:
//       // add all the rows to tempBoard
//       // for (let k = 0; k < 5; k++) {
//       //   console.log('rowArray at row k = ', k, ' = ', rowArray);
//       //   // add this row to the board
//       //   // for (let k=0; k<)
//       // }
//     }
//     boards.push(tempBoard);
//   }
// };

// const findAnswer = () => {
//   // let Puzzle1Answer = scoreOfLoserBoard * loserBallNumber;
//   // console.log('theAnswer D4P2', Puzzle1Answer);
//   // return theAnswer;
//   return 123;
// };

// async function findStuffFromFile() {
//   let url = exampleData;
//   // let url = data;

//   // let url = 'http://localhost:3000/src/puzzles/Day5-ExampleData.txt';
//   let response = await fetch(url);

//   let raw = await response.text();
//   // setRawText(await response.text());

//   // rawText = await response.text(); // read response body and parse as text
//   //   response.text() – read the response and return as text,
//   // response.json() – parse the response as JSON,
//   // response.formData() – return the response as FormData object (explained in the next chapter),
//   // response.blob() – return the response as Blob (binary data with type),
//   // response.arrayBuffer() – return the response as ArrayBuffer (low-level representation of binary data),
//   if (response.ok) {
//     console.log(raw);
//     debugger;
//     console.log(raw);
//     console.log('eh');
//     return raw;
//   }

//   // splitUpData();
//   // answer = findAnswer();
// }

// findStuffFromFile();
