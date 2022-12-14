import { useState } from 'react';
import './App.css';

function App() {

  const [turn, setTurn] = useState<boolean>(true);
  const [grid, setGrid] = useState<string[]>(Array(9).fill(''));
  const [winner, setWinner] = useState<string>('');  
  const [count, setCount] = useState<number>(1);
  const [winningLines, setWinningLines] = useState<number[][][]>([
    [[1, 2], [4, 8], [3, 6]],
    [[0, 2], [4, 7]],
    [[0, 1], [4, 6], [5, 8]],
    [[4, 5], [0, 6]],
    [[3, 5], [0, 8], [2, 6], [1, 7]],
    [[3, 4], [2, 8]],
    [[7, 8], [2, 4], [0, 3]],
    [[6, 8], [1, 4]],
    [[6, 7], [0, 4], [2, 5]]
  ]);

  function getPlayer(turn: boolean) {
    if (turn)
      return 'X';
    return 'O';
  }

  function checkLines(cells: string[], index: number, player: string) {
    const opponent = getPlayer(!turn);
    const linesToCheck = winningLines[index];
  
    for (let i = 0; i < linesToCheck.length; i++) {
      const [cell1, cell2] = linesToCheck[i];
      if (cells[cell1] === player && cells[cell2] === player) {
        return true;
      } else if (cells[cell1] === opponent || cells[cell2] === opponent) {
        linesToCheck.splice(i, 1);
        i--;
      }
    }
    winningLines[index] = linesToCheck;
    setWinningLines([...winningLines]);
    return false;
  }
  

  function checkWinner(cells: string[], index: number): string {
    const player = cells[index];
    return checkLines(cells, index, player) 
      ? `${player} WINS`
      : count === 9
      ? "IT'S A TIE"
      : "";
  }

  function handleClick(index: number) {
    if(grid[index] !== ""){
      return;
    }
    let cells = [...grid]
    cells[index] = getPlayer(turn);
    setTurn(!turn);
    setCount(() => count + 1);
    setGrid(cells);
    if (count >= 5) {
      setWinner(checkWinner(cells, index))
    }
  }

  function handleRestart() {
    setGrid(Array(9).fill(''));
    setWinner('');
    setWinningLines([
      [[1, 2], [4, 8], [3, 6]],
      [[0, 2], [4, 7]],
      [[0, 1], [4, 6], [5, 8]],
      [[4, 5], [0, 6]],
      [[3, 5], [0, 8], [2, 6], [1, 7]],
      [[3, 4], [2, 8]],
      [[7, 8], [2, 4], [0, 3]],
      [[6, 8], [1, 4]],
      [[6, 7], [0, 4], [2, 5]]
    ]);
    setCount(1);
  }

  return (
    <div className="App">
      <div className='winner'>{winner}</div>
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
