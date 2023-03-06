import React, { useEffect, useState } from 'react'
import {RiArrowRightSLine} from 'react-icons/ri'
import {RiArrowLeftSLine} from 'react-icons/ri'
import './HomePage.css'

export default function HomePage() {

  const [ silderCount, setSilderCount ] = useState(0)
  
  const sliderArray = ["https://www.mobilecentre.am/img/slider/3090128bcfcf89c8cbc7_WebBig.png", "https://www.mobilecentre.am/img/slider/407d751d7e5fbb8e8635_Mec%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.png", "https://www.mobilecentre.am/img/slider/26aa5b274866e5843e4f_webbig.png", "https://www.mobilecentre.am/img/slider/7955211a2b166c67cc6d_mec.png", "https://www.mobilecentre.am/img/slider/c77db236c36c3a281fca_iPadmec%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.png", "https://www.mobilecentre.am/img/slider/bb79d28a4429c003c7da_watchmec.png", "https://www.mobilecentre.am/img/slider/c15cf051659c19b1d772_AirPodsmec_.png", "https://www.mobilecentre.am/img/slider/c51c5324670e50fad747_mec.png", "https://www.mobilecentre.am/img/slider/ad4064918f635239921b_TVmec.png", "https://www.mobilecentre.am/img/slider/4f34952f767e97940dbb_mec.png", "https://www.mobilecentre.am/img/slider/46dfcb3254b12cfdd39b_mec.png", "https://www.mobilecentre.am/img/slider/b5abd068360ccdfdf13f_mec.png"]
  
  const moveSliderToRight = () => {
    silderCount !== sliderArray.length - 1 ? setSilderCount(silderCount + 1): setSilderCount(0)
  }

  const moveSliderToLeft = () => {
    silderCount !== 0 ? setSilderCount(silderCount - 1): setSilderCount(sliderArray.length - 1)
  }

  return (
    <div className='homepage_main'>
      <div className="homepage_slider">
        <div className="slider_move_div slider_left" onClick={moveSliderToLeft}>
          <RiArrowLeftSLine />
        </div>
        <div className="homepage_silder_content" style={{left: "-" + silderCount + "00%"}}>
          {
            sliderArray.map(slide => {
              return (
                <img key={slide} src={slide} alt="slider image" />
              )
            })
          }
        </div>
        <div className="homepage_slider_content_disks">
          {
            new Array(sliderArray.length).fill("").map((elem, i) => {
              return (
                <div key={i} className="slider_disk" onClick={() => setSilderCount(i)} style={{background: silderCount === i ? "red": "none", border: `2px solid ${silderCount !== i ? "#fff": "red"}` }}></div>
              )
            })
          }
        </div>
        <div className="slider_move_div slider_right" onClick={moveSliderToRight}>
          <RiArrowRightSLine />
        </div>
      </div>
    </div>
  )
}
