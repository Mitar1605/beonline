import React, { memo, useContext } from 'react'
import BasketContainer from '../../components/basketContainer/BasketContainer'
import { isAuthContext } from '../../App'
import './Shop.css'

export default memo(function Shop() {

    const {shopList} = useContext(isAuthContext)

  return (
    <div className='shopPage_main'>
      <div className="shoppage_product_container">
        <p className='shoppage_product_container_p'>Զամբյուղ</p>
        {
          shopList.length === 0 ? <h2>Զամբյուղը դատարկ է</h2>:
          <BasketContainer />
        }
      </div>
    </div>
  )
})
