import React, { memo, useContext ,useState } from 'react'
import AdminPanelSideBar from '../../components/adminPanelSideBar/AdminPanelSideBar'
import AdminPanelContent from '../../components/adminPanelContent/AdminPanelContent'
import { isAuthContext } from '../../App'
import {BiUserCircle} from 'react-icons/bi'
import './AdminPanel.css'

export default memo(function AdminPanel() {
  const {initialUser} = useContext(isAuthContext)

  const isAdmin = initialUser.status === 'admin'

  const adminPanelTools = ['Ապրանքներ', 'Օգտատերեր']
  
  const [initialTool, setInitialTool] = useState(adminPanelTools[0])

  return (
    <>
      {
        isAdmin ? (
          <div className='admin_panel_main'>
            <div className="admin_panel_container">
              <div className="admin_panel_side_bar">
                <AdminPanelSideBar adminPanelTools={adminPanelTools} initialTool={initialTool} setInitialTool={setInitialTool} />
              </div>
              <div className="admin_panel_content">
                <AdminPanelContent initialTool={initialTool} />
              </div>
            </div>
          </div>
        ): document.location = '*'
      }
    </>
    
  )
})
