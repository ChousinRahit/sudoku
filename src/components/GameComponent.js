import React, { useContext } from 'react';
import { Context as SudokuContext } from '../context/Sudoku-context';

export const GameComponent = props => {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const { state } = useContext(SudokuContext);
  const {
    numberSelected,
    gameArray,
    fastMode,
    cellSelected,
    initArray,
  } = state;

  function _isCellSameAsSelectedCell(row, column) {
    if (fastMode) {
      if (numberSelected === gameArray[row * 9 + column]) {
        return true;
      }
      return false;
    } else {
      if (cellSelected === row * 9 + column) {
        return true;
      }
      if (gameArray[cellSelected] === '0') {
        return false;
      }
      if (gameArray[cellSelected] === gameArray[row * 9 + column]) {
        return true;
      }
    }
  }

  //    Returns the classes for a cell related to the selected cell.

  function _selectedCell(indexOfArray, value, highlight) {
    if (value !== '0') {
      if (initArray[indexOfArray] === '0') {
        return (
          <td
            className={`game__cell game__cell--userfilled game__cell--${highlight}selected`}
            key={indexOfArray}
            onClick={() => props.onClick(indexOfArray)}
          >
            {value}
          </td>
        );
      } else {
        return (
          <td
            className={`game__cell game__cell--filled game__cell--${highlight}selected`}
            key={indexOfArray}
            onClick={() => props.onClick(indexOfArray)}
          >
            {value}
          </td>
        );
      }
    } else {
      return (
        <td
          className={`game__cell game__cell--${highlight}selected`}
          key={indexOfArray}
          onClick={() => props.onClick(indexOfArray)}
        >
          {value}
        </td>
      );
    }
  }

  // Returns the classes or a cell not related to the selected cell.

  function _unselectedCell(indexOfArray, value) {
    if (value !== '0') {
      if (initArray[indexOfArray] === '0') {
        return (
          <td
            className="game__cell game__cell--userfilled"
            key={indexOfArray}
            onClick={() => props.onClick(indexOfArray)}
          >
            {value}
          </td>
        );
      } else {
        return (
          <td
            className="game__cell game__cell--filled"
            key={indexOfArray}
            onClick={() => props.onClick(indexOfArray)}
          >
            {value}
          </td>
        );
      }
    } else {
      return (
        <td
          className="game__cell"
          key={indexOfArray}
          onClick={() => props.onClick(indexOfArray)}
        >
          {value}
        </td>
      );
    }
  }

  return (
    <section className="game">
      <table className="game__board">
        <tbody>
          {rows.map(row => {
            return (
              <tr className="game__row" key={row}>
                {rows.map(column => {
                  const indexOfArray = row * 9 + column;
                  const value = gameArray[indexOfArray];

                  if (cellSelected === indexOfArray) {
                    return _selectedCell(indexOfArray, value, 'highlight');
                  }

                  if (fastMode) {
                    if (
                      numberSelected !== '0' &&
                      _isCellSameAsSelectedCell(row, column)
                    ) {
                      return _selectedCell(indexOfArray, value, '');
                    } else {
                      return _unselectedCell(indexOfArray, value);
                    }
                  } else {
                    if (
                      cellSelected !== -1 &&
                      _isCellSameAsSelectedCell(row, column)
                    ) {
                      return _selectedCell(indexOfArray, value, '');
                    } else {
                      return _unselectedCell(indexOfArray, value);
                    }
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
