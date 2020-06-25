import createDataContext from './createDataContext';
import moment from 'moment';

const sudokuReducer = (state, actions) => {
  const { type, payload } = actions;

  // let defc = [
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   'S',
  //   'E',
  //   'L',
  //   'E',
  //   'C',
  //   'T',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   'Y',
  //   'O',
  //   'U',
  //   'R',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   'L',
  //   'E',
  //   'V',
  //   'E',
  //   'L',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  //   '0',
  // ];
  switch (type) {
    case 'CREATE_NEW_GAME':
      return {
        ...state,
        initArray: payload.temporaryInitArray,
        gameArray: payload.temporaryInitArray,
        numberSelected: payload.numberSelected,

        timeGameStarted: moment(),
        cellSelected: payload.cellSelected,
        isWon: payload.isWon,
      };

    case 'SET_IS_WON':
      return {
        ...state,
        isWon: payload,
      };
    case 'CHANGE_IN_CELL_SEL':
      return {
        ...state,
        cellSelected: payload,
      };
    case 'CHANGE_IN_DIFF':
      return {
        ...state,
        difficulty: payload,
      };
    case 'CHANGE_IN_NUM_SEL':
      return {
        ...state,
        numberSelected: payload,
      };
    case 'CHANGE_IN_GAME_ARRAY':
      return {
        ...state,
        gameArray: [...payload],
      };
    case 'CHANGE_IN_FAST_MODE':
      return {
        ...state,
        fastMode: payload,
      };
    default:
      return state;
  }
};

const setIsWon = dispatch => payload => {
  dispatch({ type: 'SET_IS_WON', payload });
};

const createNewGameAction = dispatch => payload => {
  dispatch({ type: 'CREATE_NEW_GAME', payload });
};
const onCellSelectedChange = dispatch => payload => {
  dispatch({ type: 'CHANGE_IN_CELL_SEL', payload });
};
const onDifficultyChange = dispatch => payload => {
  dispatch({ type: 'CHANGE_IN_DIFF', payload });
};
const onNumberSelectedChange = dispatch => payload => {
  dispatch({ type: 'CHANGE_IN_NUM_SEL', payload });
};

const setGameArray = dispatch => payload => {
  dispatch({ type: 'CHANGE_IN_GAME_ARRAY', payload });
};

const setFastMode = dispatch => payload => {
  dispatch({ type: 'CHANGE_IN_FAST_MODE', payload });
};

export const { Context, Provider } = createDataContext(
  sudokuReducer,
  {
    createNewGameAction,
    setIsWon,
    onCellSelectedChange,
    onDifficultyChange,
    onNumberSelectedChange,
    setGameArray,
    setFastMode,
  },
  {
    numberSelected: '0',
    gameArray: [],
    difficulty: 'Easy',
    timeGameStarted: moment(),
    fastMode: false,
    cellSelected: -1,
    initArray: [],
    isWon: false,
  }
);
