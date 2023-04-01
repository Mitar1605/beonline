import React, { memo, useContext } from 'react'
import { isAuthContext } from '../../App'
import AdminPanelSideBar from '../../components/adminPanelSideBar/AdminPanelSideBar'
import './AdminPanel.css'

export default memo(function AdminPanel() {

  const {initialUser} = useContext(isAuthContext)

  const adminPanelTools = ['Ապրանքներ']

  return (
    <div className='admin_panel_main'>
      <div className="admin_panel_container">
        <div className="admin_panel_side_bar">
          <AdminPanelSideBar adminPanelTools={adminPanelTools} />
        </div>
        <div className="admin_panel_content">

        </div>
      </div>
    </div>
  )
})
