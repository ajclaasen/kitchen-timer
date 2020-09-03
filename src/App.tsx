import React from 'react';
import logo from './logo.svg';
import './App.css';

import Container from '@material-ui/core/Container';

import PlayPauseButton from './UI/PlayPauseButton';
import StopButton from './UI/StopButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kitchen Timer</h1>
      </header>
      <main>
        <Container>
          <PlayPauseButton playing={false} />
          <StopButton />
        </Container>
      </main>
    </div>
  );
}

export default App;
