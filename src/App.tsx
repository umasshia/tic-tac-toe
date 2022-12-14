import { useState } from 'react';
import './App.css';

function App() {

  const [turn, setTurn] = useState('X');
  const [grid, setGrid] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  const [winner, setWinner] = useState('');  

  function checkWinner(cells: string[][], rowIndex: number, colIndex: number, trn: string) {
    let col = 0
    let row = 0
    let dg = 0
    let rdg = 0
    for (let i = 0; i < 3; i++){
      cells[rowIndex][i] === trn && col++ 
      cells[i][colIndex] === trn && row++
      cells[i][i] === trn && dg++
      cells[i][3-i] === trn && rdg++
    }
    if(col === 3 || row === 3 || dg === 3 || rdg === 3) alert(`${trn} Wins!`)
  }

  function handleClick(rowIndex: number, colIndex: number) {
    if(grid[rowIndex][colIndex] !== ""){
      return;
    }
    let cells = [...grid]
    let trn = turn
    if(turn === 'X'){
      cells[rowIndex][colIndex] = 'X';
      setTurn('O')
    }
    else{
      cells[rowIndex][colIndex] = 'O'
      setTurn('X')
    }
    setGrid(cells)
    checkWinner(cells, rowIndex, colIndex, trn)
  }

  function handleRestart(){
    setGrid([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])
    setWinner('')
  }

  return (
    <div className="App">
      <div className='grid'>
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div key={rowIndex + colIndex} className={'cell ' + (winner  ? 'done' : '')} onClick={() => handleClick(rowIndex, colIndex)} >{cell}</div>
          ))
        ))}
      </div>
      <div className ='restart' onClick={handleRestart}>Restart</div>
    </div>
  );
}

export default App;
