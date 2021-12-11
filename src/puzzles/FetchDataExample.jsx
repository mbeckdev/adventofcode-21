import React, { useState, useEffect } from 'react';
import exampleData from './Day5-ExampleData.txt';
// import data from './Day5-Data.txt';

import styled from 'styled-components';

const WrapperFetchDataExample = styled.div`
  border: 1px solid green;
`;

let answer = 1234;

function FetchDataExample() {
  // let [state, setState] = useState('ha');
  // let [rawText, setRawText] = useState(findStuffFromFile());
  // let huhAnswer = answer;
  let huhAnswer = answer;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('har');

  useEffect(() => {
    if (data) {
      // console.log('setting durt to 4');
      // splitUpData();
    }
    // setDurt(4);
  }, [data]);

  useEffect(() => {
    console.log('useEffecting');
    fetch('https://randomuser.me/api')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return 'Loading...';
  if (error) return 'Error!';

  return (
    <WrapperFetchDataExample id="fetch-data-example">
      <div>--- Fetch Data Example ---</div>
      <div>
        <a href="https://adventofcode.com/2021/day/5">
          Link to problem statement
        </a>
      </div>
      <div>
        D4P2 Answer is: {huhAnswer} - not this, check console.log answer
      </div>
      <div>
        <img src={data.results[0].picture.medium} />
      </div>
    </WrapperFetchDataExample>
  );
}

export default FetchDataExample;

// let promise = fetch(exampleData);
// console.log('assfasdf', promise);

// let response = await fetch(exampleData);

// if (response.ok) {
//   let json = await response.json();
// } else {
//   alert('HTTP-Error: ' + response.status);
// }

// let rawText = 'will be replaced';

// .
// .
// .
// .
// .
// .
// .
// .
// import React, { useState, useEffect } from 'react';
// import exampleData from './Day5-ExampleData.txt';
// // import data from './Day5-Data.txt';

// import styled from 'styled-components';

// const WrapperDay5Puzzle1 = styled.div`
//   border: 1px solid green;
// `;

// let answer = 1234;

// function Day5Puzzle1() {
//   let url = exampleData;
//   // let url = rawText;

//   let huhAnswer = answer;

//   const [rawText, setrawText] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   console.log('d5p1 start function');

//   const splitUpData = () => {
//     console.log('splitting up data');
//     let arrayOfLines = rawText.split('\r\n');
//     console.log('arrayOfLines', arrayOfLines);
//     // arrayOfLines looks like "['0,9 -> 5,9','8,0 -> 0,8',...]"
//     for (let i = 0; i < arrayOfLines.length; i++) {}
//   };

//   const [durt, setDurt] = useState(0);
//   useEffect(() => {
//     if (rawText) {
//       console.log('setting durt to 4');
//       splitUpData();
//     }
//     setDurt(4);
//   }, [rawText]);

//   useEffect(() => {
//     fetch(url)
//       .then((response) => {
//         if (response.ok) {
//           return response.text();
//         }
//         throw response;
//       })
//       .then((rawText) => {
//         setrawText(rawText);
//         console.log('settingRawText');
//       })
//       .catch((error) => {
//         console.error('Error fetching rawText: ', error);
//         setError(error);
//       })
//       .finally(() => {
//         setLoading(false);
//         console.log('loading complete!');
//       });
//   }, []);
//   if (loading) return 'Loading...';
//   if (error) return 'Error!';

//   class Point {
//     constructor(x, y) {
//       this.x = x;
//       this.y = y;
//     }
//     getX() {
//       return this.x;
//     }
//   }
//   let dur = new Point(1, 2);
//   console.log(dur.x, dur.y, 'example points');

//   class Vector {
//     constructor(startPoint, endPoint) {
//       this.startPoint = startPoint;
//       this.endPoint = endPoint;
//     }
//     getAllPoints() {
//       // check if x's are the same
//       // check if y's are the same
//       // note: it could be both
//       // return anArray of points
//     }
//   }

//   return (
//     <WrapperDay5Puzzle1 id="Day5-Puzzle1">
//       <div>--- Day5 Puzzle1 ---</div>
//       <div>
//         <a href="https://adventofcode.com/2021/day/5">
//           Link to problem statement
//         </a>
//       </div>
//       <div>
//         D4P2 Answer is: {huhAnswer} - not this, check console.log answer
//       </div>
//       <div>{durt}</div>
//       <div>
//         {/* <img src={data.results[0].picture.medium} />
//          */}
//         {rawText}
//       </div>
//     </WrapperDay5Puzzle1>
//   );
// }

// export default Day5Puzzle1;

// //pseudo code
// //

// // class User {
// //   constructor(name) {
// //     this.name = name;
// //   }

// //   sayHi() {
// //     // alert(this.name);
// //     console.log(this.name);
// //   }
// // }
// // let user = new User('John');
// // user.sayHi();

// // const splitUpData = () => {
// //   let arrayOfLines = rawText.split('\r\n');

// //   balls = arrayOfLines[0].split(',');
// //   for (let i = 0; i < balls.length; i++) {
// //     balls[i] = Number(balls[i]);
// //   }

// //   let notTop2Lines = arrayOfLines.slice(2);

// //   // let boards = [];

// //   //cycle through each board.
// //   for (let i = 0; i < notTop2Lines.length; i += 6) {
// //     // let tempBoard = [[],[],[]],[[],[],[]],[[],[],[]]  except 5x5
// //     // let tempBoard = [Row1Array, Row2Array, Row3Array and so on]
// //     let tempBoard = [];
// //     // console.log('i', i);

// //     //cycle through each line of text for the next 5 lines.

// //     for (let k = 0; k < 5; k++) {
// //       // notTop2Lines[0] = "22 13 17 11  0"
// //       let rowText = notTop2Lines[i + k];

// //       // find the row Array
// //       let rowArray = [];
// //       for (let j = 0; j < rowText.length; j += 3) {
// //         let thisNumber = rowText[j].concat(rowText[j + 1]);
// //         // console.log('number = -' + thisNumber + '-');
// //         if (thisNumber[0] === ' ') {
// //           thisNumber = thisNumber[1];
// //         }
// //         thisNumber = Number(thisNumber);
// //         rowArray.push(thisNumber);
// //         // add this number to part of the row
// //       }
// //       // add rowArray to tempBoard
// //       tempBoard.push(rowArray);

// //       // general pseudo code notes:
// //       // add all the rows to tempBoard
// //       // for (let k = 0; k < 5; k++) {
// //       //   console.log('rowArray at row k = ', k, ' = ', rowArray);
// //       //   // add this row to the board
// //       //   // for (let k=0; k<)
// //       // }
// //     }
// //     boards.push(tempBoard);
// //   }
// // };

// // const findAnswer = () => {
// //   // let Puzzle1Answer = scoreOfLoserBoard * loserBallNumber;
// //   // console.log('theAnswer D4P2', Puzzle1Answer);
// //   // return theAnswer;
// //   return 123;
// // };

// // async function findStuffFromFile() {
// //   let url = exampleData;
// //   // let url = data;

// //   // let url = 'http://localhost:3000/src/puzzles/Day5-ExampleData.txt';
// //   let response = await fetch(url);

// //   let raw = await response.text();
// //   // setRawText(await response.text());

// //   // rawText = await response.text(); // read response body and parse as text
// //   //   response.text() – read the response and return as text,
// //   // response.json() – parse the response as JSON,
// //   // response.formData() – return the response as FormData object (explained in the next chapter),
// //   // response.blob() – return the response as Blob (binary data with type),
// //   // response.arrayBuffer() – return the response as ArrayBuffer (low-level representation of binary data),
// //   if (response.ok) {
// //     console.log(raw);
// //     debugger;
// //     console.log(raw);
// //     console.log('eh');
// //     return raw;
// //   }

// //   // splitUpData();
// //   // answer = findAnswer();
// // }

// // findStuffFromFile();
