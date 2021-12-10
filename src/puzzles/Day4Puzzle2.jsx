import React from 'react';
import data from './Day4-Data.txt';
// import exampleData from './Day4-ExampleData.txt';

import styled from 'styled-components';

const WrapperDay4Puzzle2 = styled.div`
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

  // let url = 'http://localhost:3000/src/puzzles/Day4-ExampleData.txt';
  let response = await fetch(url);
  rawText = await response.text(); // read response body and parse as JSON
  //   response.text() – read the response and return as text,
  // response.json() – parse the response as JSON,
  // response.formData() – return the response as FormData object (explained in the next chapter),
  // response.blob() – return the response as Blob (binary data with type),
  // response.arrayBuffer() – return the response as ArrayBuffer (low-level representation of binary data),

  splitUpData();
  answer = findAnswer();
}
findStuffFromFile();

// function createBoardsArray() {}

let balls = [];
let boards = [];

const splitUpData = () => {
  let arrayOfLines = rawText.split('\r\n');

  balls = arrayOfLines[0].split(',');
  for (let i = 0; i < balls.length; i++) {
    balls[i] = Number(balls[i]);
  }

  let notTop2Lines = arrayOfLines.slice(2);

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

      // find the row Array
      let rowArray = [];
      for (let j = 0; j < rowText.length; j += 3) {
        let thisNumber = rowText[j].concat(rowText[j + 1]);
        // console.log('number = -' + thisNumber + '-');
        if (thisNumber[0] === ' ') {
          thisNumber = thisNumber[1];
        }
        thisNumber = Number(thisNumber);
        rowArray.push(thisNumber);
        // add this number to part of the row
      }
      // add rowArray to tempBoard
      tempBoard.push(rowArray);

      // general pseudo code notes:
      // add all the rows to tempBoard
      // for (let k = 0; k < 5; k++) {
      //   console.log('rowArray at row k = ', k, ' = ', rowArray);
      //   // add this row to the board
      //   // for (let k=0; k<)
      // }
    }
    boards.push(tempBoard);
  }
};

let hitGrids = [[[]]]; //false = no hit, true = hit
function createHitGrids() {
  let emptyHitGrid = [];
  for (let i = 0; i < 5; i++) {
    emptyHitGrid.push([false, false, false, false, false]);
  }

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
}

let boardsHaveWon = []; //[true,false,false]
let boardsHaveWonInOrder = [];
let loserBallNumber = 0;
let loserHitsSnapshot = [];

const findAnswer = () => {
  // initialize boardshavewon
  for (let i = 0; i < boards.length; i++) {
    boardsHaveWon[i] = false;
  }

  createHitGrids(); // size based of off boards length

  let boardsThatAreWinners = [];
  for (let k = 0; k < boards.length; k++) {
    boardsThatAreWinners.push(false);
  }

  let winningBallIndex = '';
  let winningBoardIndex = '';

  // cycle through all balls
  for (let i = 0; i < balls.length; i++) {
    // cycle through all boards
    for (let j = 0; j < boards.length; j++) {
      let thisBoardWins = false;
      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
          if (balls[i] === boards[j][y][x]) {
            hitGrids[j][y][x] = true;
          }
        }
      }
      // check if this board is a winner
      thisBoardWins = checkThisBoard(j);
      if (thisBoardWins === true) {
        //   // get out of checking everything
        boardsThatAreWinners[j] = true;
        winningBallIndex = i;
        winningBoardIndex = j;
        boardsHaveWon[winningBoardIndex] = true;

        if (
          boardsHaveWonInOrder.findIndex(
            (item) => item === winningBoardIndex
          ) === -1
        ) {
          boardsHaveWonInOrder.push(winningBoardIndex);
          if (boardsHaveWonInOrder.length === boards.length) {
            if (loserBallNumber === 0) {
              loserBallNumber = balls[i];
              for (let p = 0; p < 5; p++) {
                let row = [];
                for (let q = 0; q < 5; q++) {
                  row.push(hitGrids[winningBoardIndex][p][q]);
                }
                loserHitsSnapshot.push([...row]);
              }
            }
          }
        }
        //   // don't check any more balls after this one.
        // i = 500;

        // i = boards.length;
      }

      // going through each board
    }
    let numberOfBoardsThatWon = 0;
    for (let k = 0; k < boardsHaveWon.length; k++) {
      if (boardsHaveWon[k] === true) {
        numberOfBoardsThatWon++;
      }
    }
    // console.log('boardsHaveWon.length', boardsHaveWon.length);
    if (numberOfBoardsThatWon === boardsHaveWon.length - 1) {
    }
  }

  // for first ball,
  //   cycle through all boards,
  //     cycle through all numbers on a board
  //         -if it matches, changed spot in hit board to true
  //     check if this board is a winner.   board.checkIfWon would work if I made classes!

  //

  // we have a board that won, find sum of all unmarked numbers
  let sumOfUnmarked = findSumOfAllUnmarkedNumbers(winningBoardIndex);
  // then multiply that sum by the ball number that was just called
  let winningBallNumber = balls[winningBallIndex];

  let theAnswer = sumOfUnmarked * winningBallNumber;

  let scoreOfLoserBoard = 0;
  let boardnum = boardsHaveWonInOrder.at(-1);
  scoreOfLoserBoard = findSumOfAllLoserUnmarkedNumbers(boardnum);
  /////////////////////////////////////is 0

  let puzzle2Answer = scoreOfLoserBoard * loserBallNumber;
  console.log('theAnswer D4P2', puzzle2Answer);
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

function findSumOfAllLoserUnmarkedNumbers(boardIndex) {
  let theBoard = boards[boardIndex];

  let sumTotal = 0;

  for (let i = 0; i < theBoard.length; i++) {
    for (let j = 0; j < theBoard[0].length; j++) {
      if (loserHitsSnapshot[i][j] === false) {
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
  for (let x = 0; x < 5; x++) {
    let hitCounter = 0;
    for (let y = 0; y < 5; y++) {
      if (hitGrids[boardIndex][y][x] === true) {
        hitCounter++;
      }
    }
    if (hitCounter === 5) {
      // console.log('win found in row ', y, ' board', boardIndex);
      return true;
    }
  }

  //check diagonals
  if (
    hitGrids[boardIndex][0][0] &&
    hitGrids[boardIndex][1][1] &&
    hitGrids[boardIndex][2][2]
  ) {
    return true;
  }
  if (
    hitGrids[boardIndex][0][2] &&
    hitGrids[boardIndex][1][1] &&
    hitGrids[boardIndex][2][0]
  ) {
    return true;
  }

  return false;
}

function Day4Puzzle2() {
  let huhAnswer = answer;
  return (
    <WrapperDay4Puzzle2 id="Day4-Puzzle2">
      <div>--- Day4 Puzzle2 ---</div>
      <div>
        <a href="https://adventofcode.com/2021/day/4">
          Link to problem statement
        </a>
      </div>
      <div>
        D4P2 Answer is: {huhAnswer} - not this, check console.log answer
      </div>
    </WrapperDay4Puzzle2>
  );
}

export default Day4Puzzle2;

// Notes
// ah geez, I'm checking multiple times around line 161 -
// there's probably a better way for that to happen.
// I think next time I'll use some classes instead of 3d arrays.
//   seems cleaner that way.
