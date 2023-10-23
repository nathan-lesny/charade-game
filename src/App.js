import { useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HowToPlay from './pages/HowToPlay'
import GameView from './pages/GameView';
import ViewGame from './pages/ViewGame';

const API_BASE = "http://localhost:3001"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/game-view" element={<GameView />} />
          <Route path="/game-view/:id" element={<ViewGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
