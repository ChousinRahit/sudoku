import React from 'react';
import { Provider as SudukuProvider } from './context/Sudoku-context';
import { Main } from './components/Main';
import './App.css';

function App() {
  return (
    <SudukuProvider>
      <Main />
    </SudukuProvider>
  );
}

export default App;
