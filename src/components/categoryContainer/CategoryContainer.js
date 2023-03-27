import React, { memo } from 'react'
import './CategoryContainer.css'
import ProductBox from '../productBox/ProductBox'
import useFetch from '../../hooks/useFetch'

export default memo(function CategoryContainer({productType, sortParam}) {

    const {isLoading, isError, data} = useFetch(`http://localhost:3500/${productType}`)

    function calcRating (rating) {
      
      return typeof(rating) === 'object' ? rating && Math.floor(rating.reduce((aggr, el) => aggr + el, 0) / rating.length): +rating
    }

  return (
    <div className="product_container_main">
        {
          isLoading ? <div className='loading_div'><div className="loading"></div></div>:
          isError ? <h1>Ohh, Something went worng!!</h1>: ''
        }
        <div className='product_container category_container'>
            {
              data.sort((p1, p2) => ( calcRating(p1[sortParam]) < calcRating(p2[sortParam])) ? 1 : (calcRating(p1[sortParam]) > calcRating(p2[sortParam])) ? -1 : 0).map(product => {
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
})
