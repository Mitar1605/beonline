import React, { useReducer, useEffect} from 'react'

export default function useFetch(url, pedUrl) {
    const [state, distpach] = useReducer((initState, action) => {
        switch (action.type) {
            case 'isLoading':
                return {
                    ...initState,
                    isLoading: true,
                    isError: false
                }
            case 'isError':
                return {
                    ...initState,
                    isLoading: false,
                    isError: true
                }
            case 'isSucces':
                return {
                    isLoading: false,
                    isError: false,
                    data: action.payload
                }
        }
    }, {
        isLoading: false,
        isError: false,
        data: []
    })

    const {isLoading, isError, data} = state

    useEffect(() => {
        distpach({type: 'isLoading'})
        
        const getData = async () => {
            return await fetch(url)
            .then(res => res.json())
            .then(data => distpach({type: 'isSucces', payload: pedUrl ? data[pedUrl]: data}))
            .catch(err => distpach({type: 'isError'}))
        }
        getData()
    }, [])

    return {isLoading, isError, data}
}
