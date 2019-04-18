import axios from 'axios'
import { GET_QUOTES, ADD_QUOTE, EDIT_QUOTE, DELETE_QUOTE, GET_ERRORS, QUOTE_LOADING, CLEAR_ERRORS, TOGGLE_MODAL } from './types'

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

// Edit Quote
export const editQuote = quoteData => dispatch => {
    console.log(quoteData)
    axios.put(`/api/quotes/${quoteData.index}`, quoteData)
        .then(res => {
            dispatch({
                type: EDIT_QUOTE,
                payload: res.data
            })
        })
}

// Delete Quote
export const deleteQuote = quoteID => dispatch => {
    axios.delete(`/api/quotes/${quoteID}`)
        .then(res => {
            dispatch({
                type: DELETE_QUOTE,
                payload: res.data
            })
        })
}

// Set Quotes Loading State
export const setQuoteLoading = () => {
    return {
        type: QUOTE_LOADING
    }
}

// Clear errors from Quote modal
export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}

// Toggle quote modal
export const toggleModalOpenOrClose = () => dispatch => {
    dispatch({
        type: TOGGLE_MODAL,
    })
}