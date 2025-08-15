import React from 'react';
import './App.css';
import TypingAnimation from './components/TypingAnimation';

function App() {
  return (
    <div className="App">
      <div 
        className="background-image"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/fishman.png)`
        }}
      ></div>
      <div className="content-overlay">
        <TypingAnimation />
      </div>
    </div>
  );
}

export default App;
