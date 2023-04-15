import React, { memo, useEffect, useState } from 'react'
import './CategoryContainer.css'
import ProductBox from '../productBox/ProductBox'
import useFetch from '../../hooks/useFetch'

export default memo(function CategoryContainer({productType, sortParam, state}) {

  const {minPrice, maxPrice, brend, year, rom, ram, color} = state

    const {isLoading, isError, data} = useFetch(`http://localhost:3500/${productType}`)

    function calcRating (rating) { 
      return typeof(rating) === 'object' ? rating && Math.floor(rating.reduce((aggr, el) => aggr + el, 0) / rating.length): +rating
    }

    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
      const getData = async () => {
          return await fetch(`http://localhost:3500/${productType}`)
          .then(res => res.json())
          .then(res => setFilteredData(res))
      }
      getData()
  }, [])

  useEffect(() => {
      setFilteredData(data.filter(el => 
          el.price >= minPrice &&
          el.price <= maxPrice
        )
        .filter(el => brend.length !== 0 ? brend.includes(el.brend): el)
        .filter(el => year.length !== 0 ? year.includes(el["year of announcement"]): el)
        .filter(el => rom.length !== 0 ? rom.includes(el.rom): el)
        .filter(el => ram.length !== 0 ? ram.includes(el.ram): el)
        .filter(el => color.length !== 0 ? color.includes(el.color): el)
      )
  }, [minPrice, maxPrice, brend, year, rom, ram, color])

  return (
    <div className="product_container_main">
        {
          isLoading ? <div className='loading_div'><div className="loading"></div></div>:
          isError ? <h1>Ohh, Something went worng!!</h1>: ''
        }
        {
          filteredData.length === 0 ? 
          <div className="filter_not_found">
            <p><span>Ուշադրություն</span> Տվյալ պայմաններով ապրանքներ առկա չեն</p>
          </div>: ""
        }
        <div className='product_container category_container'>
            {
              filteredData.sort((p1, p2) => ( calcRating(p1[sortParam]) < calcRating(p2[sortParam])) ? 1 : (calcRating(p1[sortParam]) > calcRating(p2[sortParam])) ? -1 : 0).map(product => {
                return (
                  <ProductBox key={product.id} product={product} />
                )
              })
            }
        </div>
    </div>
  )
})
