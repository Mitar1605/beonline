import React, { memo, useState, useContext } from 'react'
import './ProductRating.css'
import emptyStar from '../../assets/icons/empty_star.png'
import star from '../../assets/icons/star.png'
import Axios from 'axios'
import { isAuthContext } from '../../App'

export default memo(function ProductRating({data, product}) {

  const {rating} = product


    const [newestRating, setNewestRating] = useState(rating)
    
    const {isAuth, initialUser} = useContext(isAuthContext)

    const [initialRating, setInitialRating] = useState(calcRating(rating))
    const [ratingState, setRatingState] = useState(calcRating(rating))  
  
    const [ratedUser, setRatedUser] = useState({
      email: initialUser.email,
      index: newestRating && newestRating.length
    })
    
    function calcRating (rating) {
      return rating && Math.floor(rating.reduce((aggr, el) => aggr + el, 0) / rating.length)
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
            return await Axios.put(`http://localhost:3500/${product.type}/${product.id}`, productCopy) 
          }
          setRateData()
        }else{
          const productCopy = {...data}
          setNewestRating(productCopy.rating)
          productCopy.rating.splice(initialRatedUser.index, 1, newRating)
    
          const setRateData = async () => {
            return await Axios.put(`http://localhost:3500/${product.type}/${product.id}`, productCopy) 
          }
          setRateData()
        }
      }else{
        alert('duq cheq karox gnahatel qani der grancvac cheq mer kayqum')
      }
    }

    return (
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
  )
})
