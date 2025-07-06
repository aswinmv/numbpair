import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { GamePage } from './components/GamePage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'game'>('home');

  const navigateToGame = () => {
    setCurrentPage('game');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'home') {
    return <HomeScreen onStartGame={navigateToGame} />;
  }

  return <GamePage onBackToHome={navigateToHome} />;
}

export default App;