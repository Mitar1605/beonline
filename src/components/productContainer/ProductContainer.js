import React from 'react'
import useFetch from '../../hooks/useFetch'
import ProductBox from '../productBox/ProductBox'
import './ProductContainer.css'

export default function ProductContainer({productType}) {

    const {isLoading, isError, data} = useFetch("http://localhost:3500/" + productType)
    if (productType === "smartphone") data.length = 10

  return (
    <div className="product_container_main">
        {
            isLoading ? <div className='loading_div'><div className="loading"></div></div>:
            isError ? <h1>Ohh, Something went worng!!</h1>: ''
        }
        <div className='product_container'>
            {
                data && data.map(product => {
                    return (
                        <div key={product.id}>
                            <ProductBox product={product} />
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
