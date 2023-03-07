import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/homepage/HomePage';
import Header from './components/header/Header';
import { authUserRoutes, guestRoutes } from './hooks/routeData';

function App() {

  const isAuth = false
  
  return (
    <div className="App">
      <Header />
      <div className="header_space"></div>
      <Routes>
        {
          isAuth && authUserRoutes.map(elem => {
            return <Route path={elem.path} element={elem.component} />
          })
        }
        { 
          guestRoutes.map(elem => {
            return <Route path={elem.path} element={elem.component} />
          })
        }
      </Routes>
    </div>
  );
}

export default App;
