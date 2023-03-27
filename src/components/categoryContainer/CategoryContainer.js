import React, { memo } from 'react'
import './CategoryContainer.css'
import useFetch from '../../hooks/useFetch'

export default memo(function CategoryContainer({productType}) {

    const {isLoading, isError, data} = useFetch(`http://localhost:3500/${productType}`)

  return (
    <div>

    </div>
  )
})
