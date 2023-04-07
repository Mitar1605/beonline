import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BiUserCircle} from 'react-icons/bi'
import {ImExit} from 'react-icons/im'
import { isAuthContext } from '../../App'
import './Header.css'

export default function Header() {
  const {isAuth, initialUser, shopList} = useContext(isAuthContext)
  
  return (
    <header>
        <div className="header_container">
            <div className="logo_div">
                <NavLink to='/'>BeOnline</NavLink>
            </div>
            <div className="haeder_content">
              <nav>
                <ul>
                  <li><NavLink to={isAuth && '/shop'}><AiOutlineShoppingCart /> {shopList.length > 0 && <strong>{shopList.length}</strong>}</NavLink></li>
                  <li><NavLink className='drop_main' to={!isAuth && '/auth'}>{
                    isAuth ? <h4>{initialUser && initialUser.email.slice(0, initialUser.email.indexOf('@'))}</h4>: <> <BiUserCircle /> <span>Մուտք</span> </>
                  }
                  {
                    isAuth && 
                    <div className="header_rop_down">
                      <ul>
                        {
                          initialUser.status === 'admin' && <li><NavLink to='/admin-panel'>Ադմինստրատորի բաժին</NavLink></li>
                        }
                        <li>
                          <NavLink to='/'>Պռոֆիլ</NavLink>
                        </li>
                        <li>
                          <div className="header_rop_down_footer">
                            <NavLink to='/auth' onClick={() => {
                              sessionStorage.removeItem('isAuth')
                              sessionStorage.removeItem('rememberUser')
                              localStorage.removeItem('isAuth')
                              localStorage.removeItem('rememberUser')
                            }}><ImExit /> Ելք</NavLink>
                          </div>
                        </li>
                      </ul>
                    </div>
                  }
                  </NavLink></li>
                </ul>
              </nav>
            </div>
        </div>
    </header>
  )
}
