import React, { memo } from 'react'
import {RiFilterOffFill} from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import './CategoryToolBar.css'

export default memo(function CategoryToolBar({dispatch, state}) {
  const {minPrice, maxPrice, brend, year, rom, ram, color} = state

  const {productType} = useParams()

  const priceComma = (price) => {
    const numFor = Intl.NumberFormat('en-US');
    return numFor.format(price);
  }

  const brends = productType === 'noutbook' ? [
    {
      brendName: "Hp",
      thumbnail: "https://www.pngmart.com/files/15/Blue-Hewlett-Packard-Logo-PNG-File.png" 
    }
  ]: 'smartphone' ? [
    {
      brendName: "Realme",
      thumbnail: "https://www.mobilecentre.am/img/brands/1692eb9cdca7c7ce6b28NewProject(24).png" 
    },
    {
      brendName: "Xiaomi",
      thumbnail: "https://www.mobilecentre.am/img/brands/34e57dacf55e24d38d7d6.png" 
    },
    {
      brendName: "Apple",
      thumbnail: "https://www.mobilecentre.am/img/brands/b136b1d0734a1f3d10dd1.png" 
    },
    {
      brendName: "Samsung",
      thumbnail: "https://www.mobilecentre.am/img/brands/cef1fcb344a1664835442.png" 
    }
  ]: []

  const years = ["2023", "2022", "2021", "2019"]
  const roms = ["64 GB", "128 GB", "256 GB", "512 GB"]
  const rams = ["2 GB", "4 GB", "6 GB", "8 GB", "12 GB"]
  const colors = ["blue", "gray", "black", "white", "green", "pink", "red", "lightblue",]
  
  return (
    <div className='tool_bar_container'>
      <div className="tool_bar_price">
        <p className='tool_bar_title'>ԳԻՆ</p>
        <p className='tool_bar_price_p'>{priceComma(minPrice)}դր. - {priceComma(maxPrice)}դր.</p>
        <div className="tool_bar_price_inp_cont">
          <div className="tool_bar_price_inp">
            <input type="number" value={minPrice < 500000 ? minPrice: 500000} placeholder='մին.' onChange={e => dispatch({type: 'minPrice', payload: e.target.value < 500000 ? e.target.value: 500000})} />
            <span>դր.</span>
          </div>
          <div className="tool_bar_price_inp">
            <input type="number" value={maxPrice < 9000000 ? maxPrice: 9000000} placeholder='մաքս․' onChange={e => dispatch({type: 'maxPrice', payload: e.target.value < 9000000 ? e.target.value: 9000000})} />
            <span>դր.</span>
          </div>
        </div>

        <div className="tool_bar_brend_container">
          <p className="tool_bar_title">ԲՐԵՆԴԵՐ</p>
          <div className="tool_bar_brend">
            {
              brends.map(el => {
                return (
                  <div className="tool_bar_brend_card" style={{borderColor: brend.includes(el.brendName) ? "#3d97ee": "lightgray"}} onClick={() => {
                    brend.includes(el.brendName) ? 
                    dispatch({type: 'brend', payload: brend.filter(elem => elem !== el.brendName)})
                    :
                    dispatch({type: 'brend', payload: [
                      ...brend,
                      el.brendName
                    ]})

                  }}>
                    <img src={el.thumbnail} />
                    <p>{el.brendName}</p>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="tool_bar_brend_container">
          <p className="tool_bar_title">ՀԱՅՏԱՐԱՐՈՒԹՅԱՆ ՏԱՐԻՆ</p>
          <div className="tool_bar_brend">
            {
              years.map(el => {
                return (
                  <div className="tool_bar_brend_card" style={{borderColor: year.includes(el) ? "#3d97ee": "lightgray"}} onClick={() => {
                    year.includes(el) ? 
                    dispatch({type: 'year', payload: year.filter(elem => elem !== el)})
                    :
                    dispatch({type: 'year', payload: [
                      ...year,
                      el
                    ]})

                  }}>
                    <p>{el}</p>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="tool_bar_brend_container">
          <p className="tool_bar_title">ՀԻՇՈՂՈՒԹՅՈՒՆ</p>
          <div className="tool_bar_brend">
            {
              roms.map(el => {
                return (
                  <div className="tool_bar_brend_card" style={{borderColor: rom.includes(el) ? "#3d97ee": "lightgray"}} onClick={() => {
                    rom.includes(el) ? 
                    dispatch({type: 'rom', payload: rom.filter(elem => elem !== el)})
                    :
                    dispatch({type: 'rom', payload: [
                      ...rom,
                      el
                    ]})

                  }}>
                    <p>{el}</p>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="tool_bar_brend_container">
          <p className="tool_bar_title">ՕՊԵՐԱՏԻՎ ՀԻՇՈՂՈՒԹՅՈՒՆ</p>
          <div className="tool_bar_brend">
            {
              rams.map(el => {
                return (
                  <div className="tool_bar_brend_card" style={{borderColor: ram.includes(el) ? "#3d97ee": "lightgray"}} onClick={() => {
                    ram.includes(el) ? 
                    dispatch({type: 'ram', payload: ram.filter(elem => elem !== el)})
                    :
                    dispatch({type: 'ram', payload: [
                      ...ram,
                      el
                    ]})

                  }}>
                    <p>{el}</p>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="tool_bar_brend_container">
          <p className="tool_bar_title">ԳՈՒՅՆ</p>
          <div className="tool_bar_brend tool_bar_colors">
            {
              colors.map(el => {
                return (
                  <div className="tool_bar_brend_card" style={{borderColor: color.includes(el) ? "#3d97ee": "lightgray", background: el}} onClick={() => {
                    color.includes(el) ? 
                    dispatch({type: 'color', payload: color.filter(elem => elem !== el)})
                    :
                    dispatch({type: 'color', payload: [
                      ...color,
                      el
                    ]})

                  }}>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="remove_filters_container">
          <p onClick={() => dispatch({type: 'remove'})}><RiFilterOffFill />Հեռացնել բոլոր ֆիլտրերը</p>
        </div>
      </div>
    </div>
  )
})
