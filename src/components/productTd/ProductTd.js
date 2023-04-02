import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import {BsFillTrashFill} from 'react-icons/bs'
import './ProductTd.css'

export default memo(function ProductTd({product, deleteProduct}) {

  return (
    <div className='admin_panel_products_content_table_body'>    
        <Link to={`/${product.type}/${product.model}/${product.id}`}>
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
        </Link>
            <p className='product_brend' onClick={() => deleteProduct(product.type, product.id)} style={{color: '#ff4d4d'}}>
                <BsFillTrashFill/>
            </p>
    </div>
  )
})
