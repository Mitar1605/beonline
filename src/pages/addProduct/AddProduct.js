import React, { memo, useContext,useEffect ,useState, useReducer } from 'react'
import Axios from 'axios'
import useFetch from '../../hooks/useFetch'
import { isAuthContext } from '../../App'
import './AddProduct.css'

export default memo(function AddProduct() {

    const {initialUser} = useContext(isAuthContext)
    const isAdmin = initialUser.status === 'admin'

    const firstState ={
        title: '',
        price: 0,
        type: 'smartphone',
        "year of announcement": '',
        color: '',
        "available colors": [],
        images: [],
        brend: '',
        model: '',
        ram: '',
        rom: ''
    }

    const [state, dispatch] = useReducer((initState, action) => {
        switch (action.type) {
            case 'title' :
                return {
                    ...initState,
                    title: action.payload
                }
            case 'price' :
                return {
                    ...initState,
                    price: action.payload
                }
            case 'type' :
                return {
                    ...initState,
                    type: action.payload
                }
            case 'year' :
                return {
                    ...initState,
                    "year of announcement": action.payload
                }
            case 'color' :
                return {
                    ...initState,
                    color: action.payload
                }
            case 'colors' :
                return {
                    ...initState,
                    "available colors": action.payload
                }
            case 'images' :
                return {
                    ...initState,
                    images: action.payload
                }
            case 'brand' :
                return {
                    ...initState,
                    brend: action.payload
                }
            case 'model' :
                return {
                    ...initState,
                    model: action.payload
                }
            case 'ram' :
                return {
                    ...initState,
                    ram: action.payload
                }
            case 'rom' :
                return {
                    ...initState,
                    rom: action.payload
                }
        }
    }, firstState)

    const handelAddProduct = (name, value) => {
        dispatch({type: name, payload: value})
    }

    const [postData, setPostData] = useState({})

    const setId = useFetch(`http://localhost:3500/smartphone`).data.length + 1

    useEffect(() => {
        setPostData({
            ...state,
            id: setId, 
            quantity: 1,
            "is available": true,
            rating: [],
            ratedUsers: [],
            "discounted price": 0,
            "installment 36 months": Math.floor(state.price / 36)
        })
    }, [state])

  return (
    <>
    {
        isAdmin ? (
            <div className='add_product_main'>
            <div className="add_product_title">
                <p>Ավելացնել նոր ապրանք</p>
            </div>
            <div className="add_product_content">
                <div className="add_product_form">
                    <form onSubmit={(e) => {
                        e.preventDefault()
    
                        if (JSON.stringify(state) !== JSON.stringify(firstState)) {
                            const addProduct = async () => {
                                return await Axios.post(`http://localhost:3500/${state.type}`, postData)
                            }
                            addProduct()
                            document.location = '/admin-panel'
                        }
                        
                    }}>
                        <div>
                            <label>
                                Ապրանքի անուն։
                                <input type="text" name='title' onChange={(e) => handelAddProduct('title', e.target.value)} />
                            </label>
                            <label>
                                Ապրանքի գին։
                                <input type="number" name='price' onChange={(e) => handelAddProduct('price', +e.target.value)}/>
                            </label>
                            <label>
                                Ապրանքի RAM:
                                <input type="number" name='ram' onChange={(e) => handelAddProduct('ram', e.target.value + " GB")}/>
                            </label>
                            <label>
                                Ապրանքի ROM։
                                <input type="number" name='rom' onChange={(e) => handelAddProduct('rom', e.target.value + " GB")}/>
                            </label>
    
                        </div>
                        <div>
                            <label>
                                Ապրանքի ներկայիս գույնը։
                                <input type="text" name='color' onChange={(e) => handelAddProduct('color', e.target.value)} />
                            </label>
                            <label>
                                Ապրանքի տեսակ։
                                <select name="type" id="type" onChange={(e) => handelAddProduct('type', e.target.value)}>
                                    <option value="smartphone">Smartphone</option>
                                    <option value="noutbook">Noutbook</option>
                                </select>
                            </label>
                            <label>
                                Ապրանքի հայտարարության տարին։
                                <input type="number" name="year of announcement" onChange={(e) => handelAddProduct('year', e.target.value)}/>
                            </label>
                            <label>
                                Ապրանքի բռենդը։
                                <input type="text" name="brend" onChange={(e) => handelAddProduct('brand', e.target.value)} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Ապրանքի մոդելը։
                                <input type="text" name="model" onChange={(e) => handelAddProduct('model', e.target.value)} />
                            </label>
                            <label>
                                Ապրանքի բոլոր հասանելի գույները (նշել սրորակետերով)։
                                <input type="text" name="available colors" onChange={(e) => handelAddProduct('colors', e.target.value.trim().split(','))} />
                            </label>
                            <label>
                                Ապրանքի նկարները (տեղադրել URL հասցեները) (նշել սրորակետերով)։
                                <input type="text" name="images" onChange={(e) => handelAddProduct('images', e.target.value.trim().split(','))} />
                            </label>
                            <button>
                                Ավելացնել
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        ): document.location = '*'
      }
    </>
  )
})
