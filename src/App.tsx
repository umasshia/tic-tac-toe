import { useState } from 'react';
import './App.css';

function App() {

  const [turn, setTurn] = useState<boolean>(true);
  const [grid, setGrid] = useState<string[]>(Array(9).fill(''));
  const [winner, setWinner] = useState<string>('');  
  const [count, setCount] = useState<number>(1);
  const [lineCheck, setLineCheck] = useState<number[][][]>([
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

  function whichTurn(turn: boolean) {
    if (turn)
      return 'X';
    return 'O';
  }

  function checkWinner(cells: string[], index: number) {
    var player = cells[index];
    var check = [...lineCheck];
    for (var i = 0; i < lineCheck[index].length; i++) {
      var line = lineCheck[index][i];
      if (player === cells[line[0]] && player === cells[line[1]]) {
        alert(`${player} WON!`)
        setWinner(player)
      } else if (cells[line[0]] === whichTurn(!turn) || cells[line[1]] === whichTurn(!turn)) {
        console.log(check)
        check[index].splice(i, 1)
        i--
      }
    }
    setLineCheck(check)
    if (count === 9 && !winner) {
      alert(`TIE!`);
      setWinner('T');
    }
  }

  function handleClick(index: number) {
    if(grid[index] !== ""){
      return;
    }
    let cells = [...grid]
      cells[index] = whichTurn(turn);
      setTurn(!turn);
    
    setCount(() => count + 1);
    setGrid(cells);
    if (count >= 5) {
      checkWinner(cells, index)
    }
  }

  function handleRestart() {
    setGrid(Array(9).fill(''));
    setWinner('');
    setLineCheck([
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
