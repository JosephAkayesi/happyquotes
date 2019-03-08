import axios from 'axios'
import { ADD_QUOTE, GET_ERRORS, GET_QUOTES, QUOTE_LOADING } from './types'

// Add Quote
export const addQuote = quoteData => dispatch => {
    axios.post('/api/quotes', quoteData)
        .then(res =>
            dispatch({
                type: ADD_QUOTE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Get Quotes
export const getQuotes = () => dispatch => {
    dispatch(setQuoteLoading())
    axios.get('/api/quotes')
        .then(res =>
            dispatch({
                type: GET_QUOTES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_QUOTES,
                payload: null
            })
        )
}

// Set Quotes Loading State
export const setQuoteLoading = () => {
    return {
        type: QUOTE_LOADING
    }
}