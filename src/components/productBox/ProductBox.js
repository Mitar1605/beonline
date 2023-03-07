import React from 'react'
import './ProductBox.css'

export default function ProductBox({product}) {
  
  const {id, title, thumbnail, price} = product
  console.log(thumbnail);
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
    </div>
  )
}
