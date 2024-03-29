import React, { memo } from 'react'
import AdminPanelProductsConteiner from '../adminPanelProductsContainer/AdminPanelProductsConteiner'
import AdminPanelUsersContainer from '../adminPanelUsersContainer/AdminPanelUsersContainer'
import './AdminPanelContent.css'

export default memo(function AdminPanelContent({initialTool}) {
  return (
    <div className='admin_panel_content_main'>
      <div className="admin_panel_content_title">
        <p>{initialTool}</p>
      </div>
      <div className="admin_panel_content_container">
        {
          initialTool === 'Ապրանքներ' ? <AdminPanelProductsConteiner />: initialTool === 'Օգտատերեր' ? <AdminPanelUsersContainer />: ''
        }
      </div>
    </div>
  )
})
