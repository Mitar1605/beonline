import React from 'react'
import Slider from '../../components/slider/Slider'
import HomePageNavigator from '../../components/homePageNavigator/HomePageNavigator'
import ProductContainer from '../../components/productContainer/ProductContainer'
import './HomePage.css'

export default function HomePage() {

  return (
    <div className='homepage_main'>
      <Slider />
      <HomePageNavigator />
      <div className="homepage_product_container">
        <p className='homepage_product_container_p'>Հեռախոսներ</p>
        <ProductContainer productType={"smartphone"} />
        <p className='homepage_product_container_p'>Այլ առաջարկներ</p>
        <ProductContainer productType={"noutbook"} />
      </div>
    </div>
  )
}
