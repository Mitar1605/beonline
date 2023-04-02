import React, { memo, useState, useContext } from 'react'
import {GrUserAdmin} from 'react-icons/gr'
import Axios from 'axios'
import { isAuthContext } from '../../App'
import './AdminPanelUsersBox.css'

export default memo(function AdminPanelUsersBox({user}) {

    const {initialUser} = useContext(isAuthContext)

    const [isAdmin, setIsAdmin] = useState(user.status === 'admin')

    const deleteProduct = (id) => {
        const userCopy = {...user}
        userCopy.status = isAdmin ? 'user': 'admin'
        const deleteData = async () => {
            await Axios.put(`http://localhost:3500/users/${id}`, userCopy)  
        }
        deleteData()
        if (id === initialUser.id) sessionStorage.getItem('rememberUser') ? sessionStorage.setItem('rememberUser', JSON.stringify(userCopy)): localStorage.getItem('rememberUser') && localStorage.setItem('rememberUser', JSON.stringify(userCopy))
        setIsAdmin(!isAdmin)
    }

    return (
        <div className='admin_panel_products_content_table_body'>
                <p className='user_email' style={{padding: '15px 0'}}>
                    {user.email}
                </p>
                <p className='user_id'>
                    {user.id}
                </p>
                <p className='user_set_admin' onClick={() => deleteProduct(user.id)}>
                    <GrUserAdmin />
                    {
                        isAdmin ? '(Ադմինիստրատոր)': '(Օգտատեր)'
                    }
                </p>
        </div>
      )
})
