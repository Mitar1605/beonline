import React from 'react'
import { NavLink } from 'react-router-dom'
import {FcLike} from 'react-icons/fc'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BiUserCircle} from 'react-icons/bi'
import './Header.css'

export default function Header() {
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
                  <li><NavLink to='/'><BiUserCircle /> <span>Մուտք</span></NavLink></li>
                </ul>
              </nav>
            </div>
        </div>
    </header>
  )
}
