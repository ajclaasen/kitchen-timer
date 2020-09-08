import React from 'react';
import './App.css';

import Container from '@material-ui/core/Container';

import KitchenTimer from './UI/KitchenTimer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kitchen Timer</h1>
      </header>
      <main className="App-main">
        <Container>
          <KitchenTimer />
        </Container>
      </main>
    </div>
  );
}

export default App;
