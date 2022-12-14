import { useState } from 'react';
import './App.css';

function App() {

  const [turn, setTurn] = useState('X');
  const [grid, setGrid] = useState (Array(9).fill(''));
  const [winner, setWinner] = useState('');
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkRow(cells: string[]) {
    let ans = false;
    for (let i = 0; i < 9; i += 3) {
      ans ||= (cells[i] === cells[i + 1] &&
      cells[i] === cells[i + 2] &&
      cells[i] !== '')
    }
    return ans;
  }

  function checkCol(cells: string[]) {
    let ans = false;
    for (let i = 0; i < 3; i ++) {
      ans ||= (cells[i] === cells[i + 3] &&
      cells[i] === cells[i + 6] &&
      cells[i] !== '')
    }
    return ans;
  }

  function checkDiagonal(cells: string[]) {
    return ((cells[0] === cells[4] &&
      cells[0] === cells[8] && cells[0] !== '') || (
        cells[2] === cells[4] && cells[2] === cells[6] &&
        cells[2] !== ''));
  }

  function checkWinner(cells: string[]) {
    if (checkRow(cells) || checkCol(cells) || checkDiagonal(cells)) {
      alert("YOU WON")
    }
  }

  function handleClick(index: number) {
    if(grid[index] !== ""){
      return;
    }
    let cells = [...grid]
    if(turn === 'X'){
      cells[index] = 'X'
      setTurn('O')
    }
    else{
      cells[index] = 'O'
      setTurn('X')
    }
    setGrid(cells)
    checkWinner(cells)
  }

  function handleRestart(){
    setGrid(Array(9).fill(''))
    setWinner('')
  }

  return (
    <div className="App">
      <div className='grid'>
        {grid.map((cell, index) => (
          <div key={index} className={'cell ' + (winner  ? 'done' : '')} onClick={() => handleClick(index)} >{cell}</div>
        ))}
      </div>
      <div className ='restart' onClick={handleRestart}>Restart</div>
    </div>
  );
}

export default App;
