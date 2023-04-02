import React, { memo } from 'react'
import useFetch from '../../hooks/useFetch'
import AdminPanelUsersBox from '../adminPanelUsersBox/AdminPanelUsersBox'
import './AdminPanelUsersContainer.css'

export default memo(function AdminPanelUsersContainer() {
    
    const users = [
        ...useFetch('http://localhost:3500/users').data
    ]

  return (
    <div className='admin_panel_products_content'>
        <div className="admin_panel_products_content_title">
            <p>Օգտատերերի ցուցակը`</p>
        </div>
        <div className="admin_panel_products_content_table">
            <div className="admin_panel_products_content_table_header">
                <p className='user_email'>Էլ․ հասցե</p>
                <p className='user_id'>ID</p>
            </div>
            {
                users.map((user, i) => {
                    return (
                        <div key={i} >
                            <AdminPanelUsersBox user={user} />
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
})
