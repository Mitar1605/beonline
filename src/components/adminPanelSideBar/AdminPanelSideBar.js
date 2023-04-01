import React, { memo, useContext } from 'react'
import { isAuthContext } from '../../App'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import './AdminPanelSideBar.css'

export default memo(function AdminPanelSideBar({adminPanelTools, initialTool, setInitialTool}) {

  const {initialUser} = useContext(isAuthContext)

  return (
    <div className='admin_panel_side_bar_main'>
        <div className="admin_panel_header">
            <div className="logo_div">
                <h2>BeOnline</h2>
            </div>
            <div className="admin_name">
                <p>{initialUser.email.slice(0, initialUser.email.indexOf('@'))} (admin)</p>
            </div>
        </div>
        <ul className="tool_ul">
        {
            adminPanelTools.map((tool, i) => {
                return (
                    <li key={i} style={{background: initialTool === tool ? '#ebebeb': 'none'}} onClick={() => setInitialTool(tool)} >{tool === "Ապրանքներ" && <AiOutlineShoppingCart />}{tool}</li>
                )
            })
         }
        </ul>
    </div>
  )
})
