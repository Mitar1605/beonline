import React, { createContext, useState } from 'react';
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
  
  const [shopList, setShopList] = useState(initialUser.shopList ? initialUser.shopList: [])

  const [postShopDataUser, setPostShopDataUser] = useState(initialUser)
  
  const handlePostShopDataUser = (product, setInShop, quantity) => {
    if (isAuth) {
      if (!shopList.find(el => el.id === product.id)){
       if (!quantity) quantity = 1
        product.quantity = quantity
        const shopListCopy = [
          ...shopList,
          product
        ]
        setShopList(shopListCopy)
        const postShopDataUserCopy = {...postShopDataUser}
        postShopDataUserCopy.shopList = shopListCopy
        setPostShopDataUser(postShopDataUserCopy)
  
        Axios.put('http://localhost:3500/users/' + postShopDataUserCopy.id, postShopDataUserCopy)
  
        sessionStorage.getItem('rememberUser') ? sessionStorage.setItem('rememberUser', JSON.stringify(postShopDataUserCopy)): localStorage.getItem('rememberUser') && localStorage.setItem('rememberUser', JSON.stringify(postShopDataUserCopy))
  
        setInShop(true)
      }else alert("Արդեն ավելացված է զամբյուղում!")
    }else alert('Մինչև զամբյուղում ինչ-որ բան ավելացնելը անհրաժեշտ է գրանցվել')
  }

  return (
    <div className="App">
      <isAuthContext.Provider value={{isAuth, initialUser, shopList, setShopList, handlePostShopDataUser}}>
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
