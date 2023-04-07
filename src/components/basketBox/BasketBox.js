import React, { memo, useContext, useEffect, useState } from 'react'
import './BasketBox.scss'
import {Link} from 'react-router-dom'
import {AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineClose} from 'react-icons/ai'
import { isAuthContext } from '../../App'
import Axios from 'axios'

export default memo(function BasketBox({product}) {

  const {initialUser, shopList, setShopList} = useContext(isAuthContext)
  const [postShopDataUser, setPostShopDataUser] = useState(initialUser)
  
  const {id, title, type, price, images} = product

  const priceComma = (price) => {
    const numFor = Intl.NumberFormat('en-US');
    return numFor.format(price);
  }

  const deleteFromBasket = (id) => {
    const shopListCopy = shopList.filter(el => el.id !== id)
    setShopList(shopListCopy)

    const postShopDataUserCopy = {...postShopDataUser}
    postShopDataUserCopy.shopList = shopListCopy
    setPostShopDataUser(postShopDataUserCopy)

    Axios.put('http://localhost:3500/users/' + postShopDataUserCopy.id, postShopDataUserCopy)

    sessionStorage.getItem('rememberUser') ? sessionStorage.setItem('rememberUser', JSON.stringify(postShopDataUserCopy)): localStorage.getItem('rememberUser') && localStorage.setItem('rememberUser', JSON.stringify(postShopDataUserCopy))
  }

  const [quantity, setQuantity] = useState(product.quantity)
  const [padPrice, setPadPrice] = useState(price)

  const addQuantity = () => {
    setQuantity(() => quantity + 1)
  }

  const removeQuantity = () => {
    quantity - 1 >= 0 && setQuantity(() => quantity - 1)
    if (quantity - 1 === 0) deleteFromBasket(id)
  }

  useEffect(() => {
    setPadPrice(quantity * price)
  }, [quantity])
  
  useEffect(() => {
    const getData = async () => {
      return await fetch(`http://localhost:3500/${product.type}`)
      .then(res => res.json())
      .then(data => {
        if (data.find(el => el.id === product.id) === undefined) {
          deleteFromBasket(product.id)
        }
      })
    }
    getData()
  }, [])

  
  return (
    <tr>
      <td className='title_main_td'>
        <div className='image_td'>
          <img src={images && images[0]} alt="product image" />
        </div>
        <div className='title_td'>
          <Link to={`/${type}/${product.model}/${id}`}>{title}</Link>
          <p>{priceComma(price)}դր․</p>
        </div>
      </td>
      <td className='pricees_td'>
        <div className='qunatity_td'>
          <button className='quantity_button quantity_minus' onClick={removeQuantity}>
            <AiOutlineMinusCircle />
          </button>
          <p>{quantity}</p>
          <button className='quantity_button quantity_plus' onClick={addQuantity}>
            <AiOutlinePlusCircle />
          </button>
        </div>
        <div className='padPrice_td'>
          <p>{priceComma(padPrice)}դր․</p>
          <button onClick={() => deleteFromBasket(id)}>
            <AiOutlineClose /> Հեռացնել
          </button>
        </div>
      </td>
    </tr>
  )
})
