import React, { memo } from 'react'
import CategoryContainer from '../../components/categoryContainer/CategoryContainer'
import CategoryToolBar from '../../components/categoryToolBar/CategoryToolBar'
import HomePageNavigator from '../../components/homePageNavigator/HomePageNavigator'
import { useParams } from 'react-router-dom'
import './Category.css'

export default memo(function Category() {

    const {productType} = useParams()

  return (
    <div className='category_page_main'>
        <HomePageNavigator />
        <div className="category_page_main_container_main">
            <div className="category_page_main_conteiner_title">
                <p>
                    {
                        productType === 'smartphone' ? "Հեռախոսներ": productType === 'noutbook' ? "Համակարգիչներ": ""
                    }
                </p>
            </div>
            <div className="category_page_main_container">
                <CategoryToolBar />
                <CategoryContainer productType={productType} />
            </div>
        </div>
    </div>
  )
})
