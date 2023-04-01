import React, { memo } from 'react'
import useFetch from '../../hooks/useFetch'
import ProductTd from '../productTd/ProductTd'
import './AdminPanelProductsConteiner.css'

export default memo(function AdminPanelProductsConteiner() {

    const products = [
        ...useFetch('http://localhost:3500/smartphone').data,
        ...useFetch('http://localhost:3500/noutbook').data
    ]

  return (
    <div className='admin_panel_products_content'>
        <div className="admin_panel_products_content_title">
            <p>Ապրանքների ցուցակը`</p>
        </div>
        <div className="admin_panel_products_content_table">
            <div className="admin_panel_products_content_table_header">
                <p className='product_img'>Նկար</p>
                <p className='product_title'>Անուն</p>
                <p className='product_price'>Գին</p>
                <p className='product_type'>Տեսակ</p>
                <p className='product_brend'>ID</p>
                <p className='product_'>Տարի</p>
            </div>
            {
                products.map((product, i) => {
                    return (
                        <div className='admin_panel_products_content_table_body' key={i}>
                            <ProductTd product={product} />
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
})
