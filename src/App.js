import { useState } from 'react'
import './App.css';
import { Game } from './Game'

const NUM_SQUARES = 16;
let VALUES = new Array(16);


function App() {

  
  //VALUES is an array of all possible values a cell can have; the final value is null (the empty cell)
  for (var i = 0; i < NUM_SQUARES - 1; i++) {
    VALUES[i] = i + 1
  }
  VALUES[15] = null

  let gridObj = {}
  let gridArr = []

  //populate the grid by iterating over each cell and randomly selecting a number 1 - 15
  const populateGrid = () => {
    for (var i = 0; i < NUM_SQUARES; i++) {
      //get a random index
      let randomIdx = Math.floor(Math.random() * VALUES.length)
      //assign the number at random index to a place in the grid
      gridObj[i] = VALUES[randomIdx]
      gridArr[i] = VALUES[randomIdx]
      //remove that number from VALUES so that there are no duplicates
      VALUES.splice(randomIdx, 1)
    }
  }

  populateGrid()

  return (
    <Game grid={gridArr} />
  );
}

export default App;
