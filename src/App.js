import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Header from './components/header/Header';
import useScrollTop from './hooks/useScrollTop';
import { authUserRoutes, guestRoutes } from './hooks/routeData';
import Axios from 'axios';

export const isAuthContext = createContext()  

function App() {
  useScrollTop()

  const isAuth = sessionStorage.getItem('isAuth') ? JSON.parse(sessionStorage.getItem('isAuth')).val: localStorage.getItem('isAuth') ? JSON.parse(localStorage.getItem('isAuth')).val: false
  const initialUser = sessionStorage.getItem('rememberUser') ? JSON.parse(sessionStorage.getItem('rememberUser')): localStorage.getItem('rememberUser') ? JSON.parse(localStorage.getItem('rememberUser')): {}
  
  const [shopList, setShopList] = useState(initialUser.shopList)
  const [wishList, setWishList] = useState(initialUser.wishList)

  const [postShopDataUser, setPostShopDataUser] = useState(initialUser)

  const handleShopList = (product) => {
    setShopList([
      ...shopList,
      product
    ])
  }
  console.log(shopList);

  const handlePostShopDataUser = () => {
    const postShopDataUserCopy = {...postShopDataUser}
    postShopDataUserCopy.shopList = shopList,
    postShopDataUserCopy.wishList = wishList,
    setPostShopDataUser(postShopDataUserCopy)
  }

  console.log(postShopDataUser)


  return (
    <div className="App">
      <isAuthContext.Provider value={{isAuth, initialUser, handleShopList, handlePostShopDataUser}}>
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
      </isAuthContext.Provider>
    </div>
  );
}

export default App;
