import React, { memo, useContext } from 'react'
import { isAuthContext } from '../../App'
import './BasketContainer.css'
import BasketBox from '../basketBox/BasketBox'

export default memo(function BasketContainer() {

  const {shopList} = useContext(isAuthContext)

  return (
    <div className='basket_container_div'>
      <table>
        <tbody>
        {  
          shopList && shopList.map(product => {
            return (
              <div className='basket_box' key={product.id}>
                <BasketBox product={product} />
              </div>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
})
