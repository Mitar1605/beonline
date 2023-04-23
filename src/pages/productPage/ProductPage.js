import React, { memo, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ProductRating from '../../components/productRating/ProductRating'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import useFetch from '../../hooks/useFetch'
import { isAuthContext } from '../../App'
import './ProductPage.css'

export default memo(function ProductPage() {

  const {productId, productType} = useParams()

  const product = useFetch(`http://localhost:3500/${productType}/${productId}`)
  
  const {id, title, images, price} = product.data

  const {shopList, handlePostShopDataUser} = useContext(isAuthContext)

  const [inShop, setInShop] = useState(shopList.find(el => el.id === +productId))

  const [imageSliderIndex, setImageSliderIndex] = useState(0)

  const priceComma = (price) => {
    const numFor = Intl.NumberFormat('en-US');
    return numFor.format(price);
  }

  const [quantity, setQuantity] = useState(1)

  const addQuantity = () => {
    setQuantity(() => quantity + 1)
  }

  const removeQuantity = () => {
    quantity - 1 > 0 && setQuantity(() => quantity - 1)
  }
    

  return (
    <div className='product_page_main'>
      {
        product.isLoading ? <div className="loading_div"><div className="loading"></div></div> :
          product.isError ? <h1>Ohh, something went wrong!</h1> :
            product.data &&
            <div className="product_container">
              <span className='productbox_available' style={{background: product.data["is available"] ? "#9fda40": "#ff4448"}}>{product.data["is available"] ? "Առկա է": "Առկա չէ"}</span>
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
                            style={{ borderBottom: imageSliderIndex === i ? '2px solid #3d97ee' : 'none' }}
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
                  <div className="product_content_info_price">
                    <div className="product_content_info_price_div">
                      <h2>{priceComma(price)}դր․</h2>
                      <span>{product.data["discounted price"] ? priceComma(product.data["discounted price"]) + "դր․": ""}</span>
                    </div>
                  </div>
                  <div className="product_content_info">
                    <div className="product_content_info_card product_content_info_ram">
                      <span>Օպերատիվ հիշողություն</span>
                      <p>{product.data.ram}</p>
                    </div>
                    <div className="product_content_info_card product_content_info_rom">
                      <span>Հիշողություն</span>
                      <p>{product.data.rom}</p>
                    </div>
                    <div className="product_content_info_card product_content_info_year">
                      <span>Հայտարարության տարին</span>
                      <p>{product.data["year of announcement"]}</p>
                    </div>
                    <div className="product_content_info_card product_content_info_color">
                      <span>Առկա գույներ</span>
                      <div className="product_content_info_color_box">
                        {
                          product.data["available colors"] && product.data["available colors"].map((color, i) => {
                            return (
                              <div key={i} className="product_content_info_color_card" style={{background: color, width: product.data.color === color ? "25px": "20px", height: product.data.color === color ? "25px": "20px"}}></div>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div className="buy_button">
                        <button style={{background: product.data["is available"] ? "#3d97ee": 'grey', cursor:  product.data["is available"] ? "pointer": 'default'}} onClick={() => {
                          product.data["is available"] && handlePostShopDataUser(product.data, setInShop, quantity)
                        }}>
                          <AiOutlineShoppingCart />
                          {!inShop ? "Գնել" : "Զամբ. է"}
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      }
    </div>
  )
})
