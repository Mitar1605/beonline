import React, { memo } from 'react'
import './HomePageNavigator.css'

export default memo(function HomePageNavigator() {
  return (
    <div className='homePage_navigator'>
        <ul>
            <li>
                <a href='/category/smartphone'>
                    <img src="https://www.mobilecentre.am/img/catpic/68eaae4fcc979f09c3f9Untitled-1.png" alt="phone image" />    
                    ՀԵՌԱԽՈՍՆԵՐ
                </a>
            </li>
            <li>
                <a href='/category/noutbook'>
                    <img src="https://www.mobilecentre.am/img/catpic/c75b99a7168502653c33pcs.png" alt="computer image" />    
                    ՀԱՄԱԿԱՐԳԻՉՆԵՐ
                </a>
            </li>
        </ul>
    </div>  
  )
})
