import React, { memo } from 'react'
import './ProductTd.css'

export default memo(function ProductTd({product}) {
  return (
    <>
        <div className="product_img">
            <img src={product.images[0]} />
        </div>
        <p className='product_title'>
            {product.title}
        </p>
        <p className='product_price'>
            {product.price} դր․
        </p>
        <p className='product_type'>
            {product.type}
        </p>
        <p className='product_brend'>
            {product.id}
        </p>
        <p>
            {product["year of announcement"]}
        </p>
    </>
  )
})
