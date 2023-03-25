import React, { useState, useContext } from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import useFetch from '../../hooks/useFetch'
import {Link} from 'react-router-dom'
import ProductRating from '../productRating/ProductRating'
import { isAuthContext } from '../../App'
import './ProductBox.css'

export default function ProductBox({product}) {

  const {data} = useFetch(`http://localhost:3500/${product.type}/${product.id}`)

  const {id, title, images, type, price, rating} = product
  
  const {isAuth, initialUser, shopList, handlePostShopDataUser} = useContext(isAuthContext)
  
  const [inShop, setInShop] = useState(shopList.find(el => el.id === product.id) ? true: false)
  
  return (
    <div className='productbox_container'>
        <Link to={`/${type}/${product["general characteristics"].model}/${id}`}>
          <div className="productbox_thumbnail">
            <img src={images[0]} alt="product image" />
          </div>
        </Link>
        <div className="productbox_title">
          <p>{title}</p>
        </div>
        <div className="productbox_price">
          <p>{price} դր․</p>
          {
            <div>{product["discounted price"] !== 0 ? `${product["discounted price"]} դր․`: ''}</div>
          }
        </div>
        <div className="productbox_monthly_price">
          <p>Ամսական <span>{product["installment 36 months"]}</span></p>
        </div>
        <div className="productbox_available" style={{background: product["is available"] ? "#9fda40": "#ff4448"}}>
          <span>{product["is available"] ? "Առկա է": "Առկա չէ"}</span>
        </div>
        <div className="productbox_shop_div">
          <ProductRating data={data} product={product} />
          <div className="productbox_shopping">
            <button onClick={() => {
              handlePostShopDataUser(data, setInShop)
            }}>
              <AiOutlineShoppingCart />
              { !inShop ? "Գնել": "Զամբ. է"}
            </button>
          </div> 
        </div>
    </div>
  )
}
