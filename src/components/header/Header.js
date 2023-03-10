import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import {FcLike} from 'react-icons/fc'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BiUserCircle} from 'react-icons/bi'
import { isAuthContext } from '../../App'
import './Header.css'

export default function Header() {
  const {isAuth, initialUser} = useContext(isAuthContext)
  return (
    <header>
        <div className="header_container">
            <div className="logo_div">
                <NavLink to='/'>BeOnline</NavLink>
            </div>
            <div className="haeder_content">
              <nav>
                <ul>
                  <li><NavLink to='/'><FcLike /></NavLink></li>
                  <li><NavLink to='/'><AiOutlineShoppingCart /></NavLink></li>
                  <li><NavLink to='/auth'>{
                    isAuth ? <h4>{initialUser && initialUser.email.slice(0, initialUser.email.indexOf('@'))}</h4>: <> <BiUserCircle /> <span>Մուտք</span> </>
                  }</NavLink></li>
                </ul>
              </nav>
            </div>
        </div>
    </header>
  )
}
