import { useState } from 'react';
import './App.css';

function App() {

  const [turn, setTurn] = useState<string>('X');
  const [grid, setGrid] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState<string>('');  
  const checkLines = [
    [[1, 2], [4, 8], [3, 6]],
    [[0, 2], [4, 7]],
    [[0, 1], [4, 6], [5, 8]],
    [[4, 5], [0, 6]],
    [[3, 5], [0, 8], [2, 6], [1, 7]],
    [[3, 4], [2, 8]],
    [[7, 8], [2, 4], [0, 3]],
    [[6, 8], [1, 4]],
    [[6, 7], [0, 4], [2, 5]]
];

  function checkWinner(cells: string[][], index: number, trn: string) {
    var player = cells[index];
    for (var i = 0; i < checkLines[index].length; i++) {
        var line = checkLines[index][i];
        if(player === cells[line[0]] && player === cells[line[1]]) {
          alert(`${trn} WON!`);
          setWinner(trn)
        }
    }
  }

  function handleClick(index: number) {
    if(grid[index] !== ""){
      return;
    }
    let cells = [...grid]
    let trn = turn
    if(turn === 'X'){
      cells[index] = 'X';
      setTurn('O')
    }
    else{
      cells[index] = 'O'
      setTurn('X')
    }
    setGrid(cells)
    checkWinner(cells, index, trn)
  }

  function handleRestart() {
    setGrid(Array(9).fill(''));
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
