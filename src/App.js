import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/homepage/HomePage';
import Header from './components/header/Header';

function App() {
  
  return (
    <div className="App">
      <Header />
      <div className="header_space"></div>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
