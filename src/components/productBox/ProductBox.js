import React, { useState, useContext } from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import emptyStar from '../../assets/icons/empty_star.png'
import star from '../../assets/icons/star.png'
import Axios from 'axios'
import useFetch from '../../hooks/useFetch'
import { isAuthContext } from '../../App'
import './ProductBox.css'

export default function ProductBox({product}) {

  const {data} = useFetch("http://localhost:3500/smartphone/" + product.id)
  
  const {id, title, thumbnail, price, rating} = product

  const [newestRating, setNewestRating] = useState(rating)

  const {isAuth, initialUser} = useContext(isAuthContext)

  const [initialRating, setInitialRating] = useState(calcRating(rating))
  const [ratingState, setRatingState] = useState(calcRating(rating))  

  const [ratedUser, setRatedUser] = useState({
    email: initialUser.email,
    index: newestRating.length
  })
  
  function calcRating (rating) {
    return Math.floor(rating.reduce((aggr, el) => aggr + el, 0) / rating.length)
  }


  const setRatedUserFunc = (i) => {
    const ratedUserCopy = {...ratedUser}
    ratedUserCopy.index = i
    setRatedUser(ratedUserCopy)
  }

  const rateProduct = (product, newRating, ind) => {
    if (isAuth) {
      setRatedUserFunc(ind)
      let initialRatedUser = product.ratedUsers.find(el => el.email === ratedUser.email)
  
      if (!initialRatedUser) {
        const productCopy = {...data}
        setNewestRating(productCopy.rating)
        productCopy.rating.push(newRating)
        productCopy.ratedUsers.push(ratedUser)
  
        const setRateData = async () => {
          return Axios.put("http://localhost:3500/smartphone/" + product.id, productCopy) 
        }
        setRateData()
      }else{
        const productCopy = {...data}
        setNewestRating(productCopy.rating)
        productCopy.rating.splice(initialRatedUser.index, 1, newRating)
  
        const setRateData = async () => {
          return Axios.put("http://localhost:3500/smartphone/" + product.id, productCopy) 
        }
        setRateData()
      }
    }else{
      alert('duq cheq karox gnahatel qani der grancvac cheq mer kayqum')
    }
  }
  
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
                  <img src={i < ratingState ? star: emptyStar} alt="star" key={i} onMouseEnter={() => setRatingState(i + 1)} onClick={() => {
                    setInitialRating(calcRating(newestRating));
                    product.rating = newestRating;
                    rateProduct(data, ratingState, ratingState - 1)
                  }} />
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
