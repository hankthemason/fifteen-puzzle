import { useState } from 'react'
import { Board } from './Board'

const winningResults = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

export const Game = (props) => {
  
  const { grid: initGrid } = props

  const [grid, setGrid] = useState(initGrid)

  const [numMoves, setNumMoves] = useState(0)

  //after every move, check if there is a winning grid
  const checkWinner = (grid) => {
    if (grid === winningResults) {
      return true
    }
    return false
  }

  return (
    checkWinner() === true ? <div>You Won!</div> : 
    <>
      <div className='instructions'>
        <p>
        You can click on any square adjacent to an empty square to fill the empty square. {"\n"}
        <br></br>Additionally, you can click on any square in the column above or below an empty square, or any square in the row
        to the right or left of an empty square, to shift multiple cells in a column or row.
        </p>
      </div>
      <div className='board-container'>
        <Board grid={grid} setGrid={setGrid} numMoves={numMoves} setNumMoves={setNumMoves}/>
      </div>
      <div className='moves-counter'>Number of moves: {numMoves}</div>
    </>
  )
}