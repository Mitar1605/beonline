import React, { useState } from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import emptyStar from '../../assets/icons/empty_star.png'
import star from '../../assets/icons/star.png'
import './ProductBox.css'

export default function ProductBox({product}) {
  
  const {id, title, thumbnail, price, rating} = product

  const [initialRating, setInitialRating] = useState(rating)
  const [ratingState, setRatingState] = useState(rating)
  
  return (
    <div className='productbox_container'>
        <div className="productbox_thumbnail">
          <img src={thumbnail[0]} alt="product image" />
        </div>
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
          <div className="productbox_rating_div" onMouseLeave={() => setRatingState(initialRating)}>
            {
              new Array(5).fill('').map((_, i) => {
                return (
                  <img src={i < ratingState ? star: emptyStar} alt="star" key={i} onMouseEnter={() => setRatingState(i + 1)} onClick={() => {setInitialRating(ratingState); product.rating = initialRating}} />
                )
              })
            }
          </div>
          <div className="productbox_shopping">
            <button>
              <AiOutlineShoppingCart />
              Գնել
            </button>  
          </div> 
        </div>
    </div>
  )
}
