const getTempFuel = (distance) => {
  let tempFuel = 0;
  for (let i = 0; i < distance + 1; i++) {
    tempFuel += i;
  }
  return tempFuel;
};

function getAnswer(initialState) {
  console.log('initialState 3333', initialState);
  let sortedData = sortDataAlphabetically(initialState);
  console.log('lol sortedData', sortedData);
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

class Section {
  constructor(zeroToNine, fourDigitDisplay) {
    this.zeroToNine = zeroToNine;
    this.fourDigitDisplay = fourDigitDisplay;
  }
}

const bubbleSortString = (initialText) => {
  let text = initialText.split('');

  let isSwapped = false;
  for (let i = 0; i < text.length; i++) {
    isSwapped = false;

    for (let j = 0; j < text.length; j++) {
      if (text[j] > text[j + 1]) {
        let tempCharacter = text[j];
        text[j] = text[j + 1];
        text[j + 1] = tempCharacter;
        isSwapped = true;
      }
    }

    // if no two elements were swapped by inner loop, then break
    if (!isSwapped) {
      break;
    }
  }
  return text;
};

const sortDataAlphabetically = (initialState) => {
  console.log('sort initialState', initialState);
  let sortedData = [...initialState];

  // for each section:
  for (let sectionIndex = 0; sectionIndex < sortedData.length; sectionIndex++) {
    // for every text string in one zeroToNine array
    for (
      let zeroToNineIndex = 0;
      zeroToNineIndex < sortedData[sectionIndex].zeroToNine.length;
      zeroToNineIndex++
    ) {
      let initialText = sortedData[sectionIndex].zeroToNine[zeroToNineIndex];
      // for every letter in the text string,  text string is like 'abgf'
      console.log('initialText', initialText);
      let sortedStringArr = bubbleSortString(initialText);
      sortedData[sectionIndex].zeroToNine[zeroToNineIndex] = sortedStringArr;
      console.log('sortedStringArr', sortedStringArr);
    }

    // for every text string in one fourDigitDisplay array
    for (
      let fourDigitDisplayIndex = 0;
      fourDigitDisplayIndex < sortedData[sectionIndex].fourDigitDisplay.length;
      fourDigitDisplayIndex++
    ) {
      let initialText =
        sortedData[sectionIndex].fourDigitDisplay[fourDigitDisplayIndex];
      // for every letter in the text string,  text string is like 'abgf'
      console.log('initialText', initialText);
      let sortedStringArr = bubbleSortString(initialText);
      sortedData[sectionIndex].fourDigitDisplay[fourDigitDisplayIndex] =
        sortedStringArr;
      console.log('sortedStringArr', sortedStringArr);
    }
  }

  // sortedData[0].zeroToNine[0] = 'bllllaaaaaaah';
  console.log('sortedData', sortedData);
  return sortedData;
};

let allData = [];
const splitUpData = (rawText) => {
  let initialLineText = rawText.split('\r\n');
  console.log('initialLineText', initialLineText);

  let initialSections = [];
  for (let i = 0; i < initialLineText.length; i++) {
    let tempArray = [];
    tempArray = initialLineText[0].split(' | ');
    initialSections.push([...tempArray]);
  }
  console.log('initialSections', initialSections);

  // let allData = new Array(initialSections.length).fill([]);
  console.log('allData empty', allData);
  for (let i = 0; i < initialSections.length; i++) {
    let zeroToNine = [];
    let fourDigitDisplay = [];

    zeroToNine = initialSections[i][0].split(' ');
    fourDigitDisplay = initialSections[i][1].split(' ');

    let dur = new Section(zeroToNine, fourDigitDisplay);
    console.log(dur);
    allData.push(dur);
    console.log('allDataaaaa', allData);

    console.log(
      'allData',
      allData,
      'zeroToNine',
      zeroToNine,
      'fourDigitDisplay',
      fourDigitDisplay
    );
    // allData[i].push([...zeroToNine]);
    // allData[i].push([...fourDigitDisplay]);
  }
  console.log('allData ', allData);
  return allData;
};

export default getAnswer;
export { splitUpData };
