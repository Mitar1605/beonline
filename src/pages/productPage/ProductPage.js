import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductRating from '../../components/productRating/ProductRating'
import useFetch from '../../hooks/useFetch'
import './ProductPage.css'

export default memo(function ProductPage() {

  const {productId, productType} = useParams()

  const product = useFetch(`http://localhost:3500/${productType}/${productId}`)
  
  const {id, title, type, images, price, rating} = product.data

  const [imageSliderIndex, setImageSliderIndex] = useState(0)
    

  return (
    <div className='product_page_main'>
      {
        product.isLoading ? <div className="loading_div"><div className="loading"></div></div>:
        product.isError ? <h1>Ohh, something went wrong!</h1>:
        product.data && 
        <div className="product_container">
          <div className="product_container_content">
            <div className="product_page_thumbnails_slider">
                <img src={images && images[imageSliderIndex]} alt="product image" className='product_page_main_image' />
                <div className="product_page_thumbnails_slider_other_images">
                  {
                    images && images.map((image, i) => {
                      return (
                          <img 
                          src={image} 
                          alt="product image" 
                          key={i} 
                          onClick={() => setImageSliderIndex(i)} 
                          style={{borderBottom: imageSliderIndex === i ? '2px solid #3d97ee': 'none'}} 
                          />
                      )
                    })
                  }
                </div>
            </div>
            <div className="product_page_content_info">
              <div className="product_content_info_title">
                <p>{title}</p>
                  <div className="product_content_info_title_rating">
                    <p>ID: {id}</p>
                    <ProductRating data={product.data} product={product.data} />
                  </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
})
