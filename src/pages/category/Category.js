import React, { memo, useState } from 'react'
import CategoryContainer from '../../components/categoryContainer/CategoryContainer'
import CategoryToolBar from '../../components/categoryToolBar/CategoryToolBar'
import HomePageNavigator from '../../components/homePageNavigator/HomePageNavigator'
import { useParams } from 'react-router-dom'
import './Category.css'

export default memo(function Category() {

    const {productType} = useParams()

    const [sortParam, setSortParam] = useState('year of announcement')

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
                <div className="category_tool_bar_container">
                    <CategoryToolBar />
                </div>
                <div className="category_product_container">
                    <div className="category_sort_container">
                        <p>
                            Սորտավորել ըստ <span style={{fontWeight: sortParam === 'year of announcement' ? "600": "400" }} onClick={() => setSortParam('year of announcement')}>Թարմության</span> <span style={{fontWeight: sortParam === 'rating' ? "600": "400" }} onClick={() => setSortParam('rating')}>Վարկանշի</span> <span style={{fontWeight: sortParam === 'price' ? "600": "400" }} onClick={() => setSortParam('price')}>Գնի</span>
                        </p>
                    </div>
                    <CategoryContainer productType={productType} sortParam={sortParam} />
                </div>
            </div>
        </div>
    </div>
  )
})
