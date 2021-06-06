import { Cell } from './Cell'

const GRID_SIZE = 4

export const Board = (props) => {

  let { grid, setGrid, numMoves, setNumMoves } = props;

  //define an object that returns the location in the grid of each value
  let locations = {}
  for (let i = 0; i < grid.length; i++) {
    locations[grid[i]] = i
  }

  //get the location of the null square
  const nullLocation = locations[null]
  
  //get the locations of all cells in same row and same column as null square
  const getEligibleRowAndColumn = () => {
    let sameColumn = []
    let sameRow = []
    
    //which column is eligible
    let columnNumber = nullLocation % GRID_SIZE
    //which row is eligible
    let rowNumber = Math.floor(nullLocation / GRID_SIZE)

    //find all values in the same column and row as null
    for (let i = 0; i < grid.length; i++) {
      //we don't need the null cell
      if (grid[i] === null) {
        continue
      }
      let cellValue = grid[i]
      if (locations[cellValue] % GRID_SIZE === columnNumber) {
        sameColumn.push(locations[cellValue])
      } else if (Math.floor(locations[cellValue] / GRID_SIZE) === rowNumber) {
        sameRow.push(locations[cellValue])
      }
    }
    return [sameColumn, sameRow]
  }

  const [eligibleColumn, eligibleRow] = getEligibleRowAndColumn()

  //get the immediately adjacent cells to the null cell
  const getAdjacentCells = () => {
    const adjacentCells = []
    //case where there is no adjacent cell to the left
    if (nullLocation % GRID_SIZE === 0) {
      adjacentCells.push(nullLocation + 1)
    } 
    //case where there is no adjacent cell to the right
    else if (nullLocation % GRID_SIZE === 3) {
      adjacentCells.push(nullLocation - 1)
    } 
    //case where there are both right and left adjacent cells
    else {
      adjacentCells.push(nullLocation - 1)
      adjacentCells.push(nullLocation + 1)
    }

    //case where there is no upper adjacent cell
    if (nullLocation - GRID_SIZE < 0 ) {
      adjacentCells.push(nullLocation + GRID_SIZE)
    }
    //case where there is no lower adjacent cell
    else if (nullLocation + GRID_SIZE > grid.length) {
      adjacentCells.push(nullLocation - GRID_SIZE)
    }
    //case where there are both upper and lower adjacent cells
    else {
      adjacentCells.push(nullLocation + GRID_SIZE)
      adjacentCells.push(nullLocation - GRID_SIZE)
    }
    return adjacentCells
  }

  //indexes of all adjacent cells
  const adjacentCells = getAdjacentCells()

  //shift multiple cells right or left  
  const shiftRow = (clickedCell, nullCell) => {
    let gridCopy = grid.slice()
    //shift cells left
    if (clickedCell < nullCell) {
      let toShift = grid.slice(clickedCell, nullCell)
      gridCopy[clickedCell] = null
      for (let i = 0; i < toShift.length; i++) {
        gridCopy[clickedCell + i + 1] = toShift[i]
      }
      setGrid(gridCopy)
    } 
    //shift cells right
    else {
      let toShift = grid.slice(nullCell + 1, clickedCell + 1)
      gridCopy[clickedCell] = null
      for (let i = 0; i < toShift.length; i++) {
        gridCopy[nullCell + i] = toShift[i]
      }
      setGrid(gridCopy)
    }
  }

  //shift multiple cells up or down
  const shiftColumn = (clickedCell, nullCell) => {
    let gridCopy = grid.slice()
    let toShift = []
    //shift cells down
    if (clickedCell < nullCell) {
      for (let i = clickedCell; i < nullCell; i += 4) {
        toShift.push(grid[i])
      }
      gridCopy[clickedCell] = null
      for (let i = 0; i < toShift.length; i++) {
        gridCopy[clickedCell + ((i + 1) * 4)] = toShift[i]
      }
    }
    //shift cells up
    else {
      for (let i = clickedCell; i > nullCell; i -= 4) {
        toShift.push(grid[i])
      }
      gridCopy[clickedCell] = null
      for (let i = 0; i < toShift.length; i++) {
        gridCopy[clickedCell - ((i + 1) * 4)] = toShift[i]
      }

    }
    setGrid(gridCopy)
  }

  const clickHandler = (value) => {

    const locationOfClickedCell = locations[value]

    //first, check if the clicked square is even eligible for a move
    //a clicked square is only eligible if it is in the same row or column as the null square 
    //also, nothing happens when you click on the null square
    if (!value || 
      (!adjacentCells.includes(locationOfClickedCell) 
      && !eligibleRow.includes(locationOfClickedCell)
      && !eligibleColumn.includes(locationOfClickedCell))) {
      return
    } 
    
    if (adjacentCells.includes(locationOfClickedCell)) {
      let gridCopy = grid.slice()
      let temp = gridCopy[locationOfClickedCell]
      gridCopy[locationOfClickedCell] = null
      gridCopy[nullLocation] = temp
      setGrid(gridCopy)
    } else if (eligibleRow.includes(locationOfClickedCell)) {
      shiftRow(locationOfClickedCell, nullLocation)
    } else if (eligibleColumn.includes(locationOfClickedCell)) {
      shiftColumn(locationOfClickedCell, nullLocation)
    }
    setNumMoves(numMoves + 1)
  }


  
  return (
    <div className='board'>
      {grid.map(val => (
        <Cell value={val} onClick={() => clickHandler(val)} />
      ))}
    </div>
  )
}