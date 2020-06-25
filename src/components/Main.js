import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Header } from './HeaderComponent';
import { GameComponent } from './GameComponent';
import { ActionsComponent } from './ActionsComponent';
import { getUniqueSudoku } from '../lib/UniqueSudoku';
import { Context as SudokuContext } from '../context/Sudoku-context';

export const Main = () => {
  const {
    createNewGameAction,
    setIsWon,
    onCellSelectedChange,
    onDifficultyChange,
    onNumberSelectedChange,
    setGameArray,
    setFastMode,
    state,
  } = useContext(SudokuContext);

  const {
    numberSelected,
    gameArray,
    difficulty,
    fastMode,
    cellSelected,
    initArray,
  } = state;

  let [mistakesMode, setMistakesMode] = useState(false);
  let [history, setHistory] = useState([]);
  let [solvedArray, setSolvedArray] = useState([]);
  let [overlay, setOverlay] = useState(false);

  // Creates a new game and initializes the state variables.
  const _createNewGame = useCallback(
    e => {
      let [temporaryInitArray, temporarySolvedArray] = getUniqueSudoku(
        difficulty,
        e
      );

      setSolvedArray(temporarySolvedArray);
      setHistory([]);

      createNewGameAction({
        temporaryInitArray,
        numberSelected: 0,
        cellSelected: -1,
        isWon: false,
      });
    },
    [createNewGameAction, difficulty]
  );

  function _isSolved(index, value) {
    if (
      gameArray.every((cell, cellIndex) => {
        if (cellIndex === index) return value === solvedArray[cellIndex];
        else return cell === solvedArray[cellIndex];
      })
    ) {
      return true;
    }
    return false;
  }

  function _fillCell(index, value) {
    console.log('_fillCell', index, value);
    if (initArray[index] === '0') {
      let tempArray = [...gameArray];
      let tempHistory = [...history];

      tempHistory.push([...gameArray]);
      setHistory(tempHistory);

      tempArray[index] = value;
      setGameArray(tempArray);

      if (_isSolved(index, value)) {
        setOverlay(true);
        setIsWon(true);
      }
    }
  }

  function _userFillCell(index, value) {
    if (mistakesMode) {
      if (value === solvedArray[index]) {
        _fillCell(index, value);
      }
    } else {
      _fillCell(index, value);
    }
  }

  function onClickNewGame() {
    _createNewGame();
  }

  function onClickCell(indexOfArray) {
    if (fastMode && numberSelected !== '0') {
      _userFillCell(indexOfArray, numberSelected);
    }
    onCellSelectedChange(indexOfArray);
  }

  function onChangeDifficulty(e) {
    onDifficultyChange(e.target.value);
    _createNewGame(e);
  }

  function onClickNumber(number) {
    if (fastMode) {
      onNumberSelectedChange(number);
    } else if (cellSelected !== -1) {
      _userFillCell(cellSelected, number);
    }
  }

  function onClickUndo() {
    if (history.length) {
      let tempHistory = [...history];
      let tempArray = tempHistory.pop();
      setHistory(tempHistory);
      setGameArray(tempArray);
    }
  }

  function onClickErase() {
    if (cellSelected !== -1 && gameArray[cellSelected] !== '0') {
      _fillCell(cellSelected, '0');
    }
  }

  function onClickHint() {
    if (cellSelected !== -1) {
      _fillCell(cellSelected, solvedArray[cellSelected]);
    }
  }

  function onClickMistakesMode() {
    setMistakesMode(p => !p);
  }

  function onClickFastMode() {
    if (fastMode) {
      onNumberSelectedChange('0');
    }
    onCellSelectedChange(-1);
    setFastMode(p => !p);
  }

  function onClickOverlay() {
    setOverlay(false);
    _createNewGame();
  }

  useEffect(() => {
    _createNewGame();
  }, []);

  return (
    <>
      <div className={overlay ? 'container blur' : 'container'}>
        <Header onClick={onClickNewGame} />
        <div className="innercontainer">
          <ActionsComponent
            onClickNumber={number => onClickNumber(number)}
            onChange={e => onChangeDifficulty(e)}
            onClickUndo={onClickUndo}
            onClickErase={onClickErase}
            onClickHint={onClickHint}
            onClickMistakesMode={onClickMistakesMode}
            onClickFastMode={onClickFastMode}
          />
          <GameComponent onClick={indexOfArray => onClickCell(indexOfArray)} />
        </div>
      </div>
      <div
        className={overlay ? 'overlay overlay--visible' : 'overlay'}
        onClick={onClickOverlay}
      >
        <h2 className="overlay__text">
          You <span className="overlay__textspan1">solved</span>{' '}
          <span className="overlay__textspan2">it!</span>
        </h2>
      </div>
    </>
  );
};
