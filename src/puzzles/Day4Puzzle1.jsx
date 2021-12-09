import React from 'react';
import data from './Day4-Data.txt';
// import exampleData from './Day4-ExampleData.txt';

import styled from 'styled-components';

const WrapperDay4Puzzle1 = styled.div`
  border: 1px solid green;
`;

// let promise = fetch(exampleData);
// console.log('assfasdf', promise);

// let response = await fetch(exampleData);

// if (response.ok) {
//   let json = await response.json();
// } else {
//   alert('HTTP-Error: ' + response.status);
// }

let rawText = 'will be replaced';

let answer = 1234;
async function findStuffFromFile() {
  // let url = exampleData;
  let url = data;

  // console.log(url);
  // let url = 'http://localhost:3000/src/puzzles/Day4-ExampleData.txt';
  let response = await fetch(url);
  // console.log(response);
  // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
  rawText = await response.text(); // read response body and parse as JSON
  //   response.text() – read the response and return as text,
  // response.json() – parse the response as JSON,
  // response.formData() – return the response as FormData object (explained in the next chapter),
  // response.blob() – return the response as Blob (binary data with type),
  // response.arrayBuffer() – return the response as ArrayBuffer (low-level representation of binary data),
  // console.log(rawText);

  splitUpData();
  answer = findAnswer();
}
findStuffFromFile();

// function createBoardsArray() {}

let balls = [];
let boards = [];

const splitUpData = () => {
  // console.log('splitting up data');

  let arrayOfLines = rawText.split('\r\n');
  // console.log(arrayOfLines);

  balls = arrayOfLines[0].split(',');
  // console.log('balls = ', balls);
  for (let i = 0; i < balls.length; i++) {
    balls[i] = Number(balls[i]);
  }

  let notTop2Lines = arrayOfLines.slice(2);
  // console.log('notTop2Lines', notTop2Lines);

  // let boards = [];

  //cycle through each board.
  for (let i = 0; i < notTop2Lines.length; i += 6) {
    // let tempBoard = [[],[],[]],[[],[],[]],[[],[],[]]  except 5x5
    // let tempBoard = [Row1Array, Row2Array, Row3Array and so on]
    let tempBoard = [];
    // console.log('i', i);

    //cycle through each line of text for the next 5 lines.

    for (let k = 0; k < 5; k++) {
      // notTop2Lines[0] = "22 13 17 11  0"

      let rowText = notTop2Lines[i + k];

      // console.log('rowText', rowText);

      // find the row Array
      let rowArray = [];
      for (let j = 0; j < rowText.length; j += 3) {
        let thisNumber = rowText[j].concat(rowText[j + 1]);
        // console.log('number = -' + thisNumber + '-');
        if (thisNumber[0] === ' ') {
          thisNumber = thisNumber[1];
          // console.log('thisNumber single digit is -' + thisNumber + '-');
        }
        thisNumber = Number(thisNumber);
        rowArray.push(thisNumber);
        // add this number to part of the row
      }
      // add rowArray to tempBoard
      tempBoard.push(rowArray);
      // console.log('tempBoard', tempBoard);

      // add all the rows to tempBoard
      // for (let k = 0; k < 5; k++) {
      //   console.log('rowArray at row k = ', k, ' = ', rowArray);
      //   // add this row to the board
      //   // for (let k=0; k<)
      // }
    }
    boards.push(tempBoard);
    // console.log('boards', boards);
  }
  // console.log('hitGrids-9before', hitGrids);

  // find balls array
  // set boards array
  //  boards array = boards[0] is first board
  //  tempBoard[y][x] will tell the x position, left to right, and y position top to bottom
  //    tempBoard[row#][col#]

  // Fix " 8" into numbers
};

// class board {
//   hasWon() {
//     if ('a' == 'a') {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }

let hitGrids = [[[]]]; //false = no hit, true = hit
function createHitGrids() {
  let emptyHitGrid = [];
  for (let i = 0; i < 5; i++) {
    emptyHitGrid.push([false, false, false, false, false]);

    // emptyHitGrid.push(0);
    // for (let j = 0; j < 5; j++) {
    //   emptyHitGrid[i].push(0);
    //   // emptyHitGrid[i][j] = false;
    // }
    // console.log('emptyHitGrid ea', emptyHitGrid);
  }
  // console.log('emptyHitGrid', emptyHitGrid);

  for (let i = 0; i < boards.length; i++) {
    // hitGrids[i] = [...emptyHitGrid];
    hitGrids[i] = [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ];
  }
  // console.log('empty hitGrids', hitGrids);
}

const findAnswer = () => {
  // if (isResponseBack) {

  // console.log('finding answer');

  // console.log('hitGrids-2-1before', hitGrids);
  createHitGrids(); // size based of off boards length
  // console.log('hitGrids-2-2before', hitGrids);

  let boardsThatAreWinners = [];
  for (let k = 0; k < boards.length; k++) {
    boardsThatAreWinners.push(false);
  }
  // console.log(boardsThatAreWinners);

  let winningBallIndex = '';
  let winningBoardIndex = '';

  // cycle through all balls
  for (let i = 0; i < balls.length; i++) {
    // for (let i = 0; i < 1; i++) {
    // console.log('ball is', balls[i]);

    // cycle through all boards
    // console.log('hitGrids-1before', hitGrids);
    for (let j = 0; j < boards.length; j++) {
      let thisBoardWins = false;
      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
          // console.log(boards[j][y][x]);

          if (balls[i] === boards[j][y][x]) {
            // console.log(
            //   'a hit, ball',
            //   balls[i],
            //   'board',
            //   j,
            //   'row',
            //   y,
            //   'spot',
            //   y
            // );
            // console.log('hitGrids-before', hitGrids);
            hitGrids[j][y][x] = true;
            // console.log('hitGrids-after', hitGrids);
          }
        }
      }
      // check if this board is a winner
      thisBoardWins = checkThisBoard(j);
      // console.log('thisBoardWins', thisBoardWins);
      if (thisBoardWins === true) {
        //   // get out of checking everything
        boardsThatAreWinners[j] = true;
        winningBallIndex = i;
        winningBoardIndex = j;
        //   // don't check any more balls after this one.
        // i = boards.length;
        // console.log('heh i', i);
        i = 500;
        // console.log('heh2 i', i);
      }
      // console.log('hitgriiiiiid', hitGrids);
    }
    // console.log('done cycling through all boards');
  }

  // for first ball,
  //   cycle through all boards,
  //     cycle through all numbers on a board
  //         -if it matches, changed spot in hit board to true
  //     check if this board is a winner.   board.checkIfWon

  //

  // console.log('hitGrids', hitGrids);
  // console.log(
  //   'winningBallIndex',
  //   winningBallIndex,
  //   'ball number',
  //   balls[winningBallIndex]
  // );

  // we have a board that won, find sum of all unmarked numbers
  let sumOfUnmarked = findSumOfAllUnmarkedNumbers(winningBoardIndex);
  // then multiply that sum by the ball number that was just called
  let winningBallNumber = balls[winningBallIndex];

  let theAnswer = sumOfUnmarked * winningBallNumber;
  console.log('theAnswer D4P1', theAnswer);

  // return theAnswer;
  return 123;
};

function findSumOfAllUnmarkedNumbers(boardIndex) {
  let theBoard = boards[boardIndex];
  let theHits = hitGrids[boardIndex];

  let sumTotal = 0;

  for (let i = 0; i < theBoard.length; i++) {
    for (let j = 0; j < theBoard[0].length; j++) {
      if (theHits[i][j] === false) {
        sumTotal += theBoard[i][j];
      }
    }
  }

  return sumTotal;
}

function checkThisBoard(boardIndex) {
  // does top row all true?

  //cycle through 5 rows
  for (let y = 0; y < 5; y++) {
    let hitCounter = 0;
    for (let x = 0; x < 5; x++) {
      if (hitGrids[boardIndex][y][x] === true) {
        hitCounter++;
      }
    }
    if (hitCounter === 5) {
      // console.log('win found in row ', y, ' board', boardIndex);
      return true;
    }
  }

  //cycle through 5 columns

  return false;
}

// let answer = findAnswer();
// console.log('answer below', answer);
// let answer = findAnswer(data);

function Day4Puzzle1() {
  let huhAnswer = answer;
  return (
    <WrapperDay4Puzzle1 id="Day4-Puzzle1">
      <div>--- Day4 Puzzle1 ---</div>
      <div>
        <a href="https://adventofcode.com/2021/day/4">
          Link to problem statement
        </a>
      </div>
      <div>
        D4P1 Answer is: {huhAnswer} - not this, check console.log answer
      </div>
    </WrapperDay4Puzzle1>
  );
}

export default Day4Puzzle1;

// Notes
// Right before line 185 I check hitGrids - they're all false
//
