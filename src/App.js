import './App.css';
import Day1Puzzle1 from './puzzles/Day1Puzzle1';
import Day1Puzzle2 from './puzzles/Day1Puzzle2';

import styled from 'styled-components';
// import OnePuzzle from './components/OnePuzzle';
import Day2Puzzle1 from './puzzles/Day2Puzzle1';
import Day2Puzzle2 from './puzzles/Day2Puzzle2';
import Day3Puzzle1 from './puzzles/Day3Puzzle1';
import Day3Puzzle2 from './puzzles/Day3Puzzle2';
import Day4Puzzle1 from './puzzles/Day4Puzzle1';
import Day4Puzzle2 from './puzzles/Day4Puzzle2';
import Day5Puzzle1 from './puzzles/Day5Puzzle1';
import FetchDataExample from './puzzles/FetchDataExample';

const WrapperApp = styled.div`
  background-color: black;
  color: lightblue;
  min-height: 100vh;

  header {
    color: green;
  }
`;

function App() {
  return (
    <div className="App">
      <WrapperApp>
        <header>My scrap paper for Advent of Code '21</header>
        <main>
          <Day1Puzzle1 />
          <Day1Puzzle2 />
          <Day2Puzzle1 />
          <Day2Puzzle2 />
          <Day3Puzzle1 />
          <Day3Puzzle2 />
          <Day4Puzzle1 />
          <Day4Puzzle2 />
          <Day5Puzzle1 />
          {/* <FetchDataExample /> */}
          {/* <OnePuzzle></OnePuzzle> */}
        </main>
      </WrapperApp>
    </div>
  );
}

export default App;
