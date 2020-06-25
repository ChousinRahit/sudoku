import React from 'react';
import { Difficulty } from './stateLess/Difficulty';
import { Timer } from './stateLess/Timer';
import { Numbers } from './stateLess/Numbers';
import { Action } from './stateLess/Action';
import { Mode } from './stateLess/Mode';

export const ActionsComponent = props => {
  const {
    onChange,
    onClickNumber,
    onClickUndo,
    onClickErase,
    onClickHint,
    onClickMistakesMode,
    onClickFastMode,
  } = props;

  return (
    <section className="status">
      <Difficulty onChange={onChange} />
      <Timer />
      <Numbers onClickNumber={number => onClickNumber(number)} />
      <div className="status__actions">
        <Action action="undo" onClickAction={onClickUndo} />
        <Action action="erase" onClickAction={onClickErase} />
        <Action action="hint" onClickAction={onClickHint} />
        <Mode mode="mistakes" onClickMode={onClickMistakesMode} />
        <Mode mode="fast" onClickMode={onClickFastMode} />
      </div>
    </section>
  );
};
