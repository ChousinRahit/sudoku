import React, { useContext } from 'react';
import { Context as sudokuContext } from '../../context/Sudoku-context';

export const Difficulty = props => {
  const {
    state: { difficulty },
  } = useContext(sudokuContext);

  return (
    <div className="status__difficulty">
      <span className="status__difficulty-text">Difficulty:{'  '}</span>
      <select
        name="status__difficulty-select"
        className="status__difficulty-select"
        defaultValue={difficulty}
        onChange={props.onChange}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  );
};
