import {  GET_QUOTES, ADD_QUOTE, EDIT_QUOTE, DELETE_QUOTE, QUOTE_LOADING, TOGGLE_MODAL } from '../actions/types'

const util = require('util');

const initialState = {
    quotes: [],
    quote: {},
    loading: false,
    isModalOpen: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case QUOTE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_QUOTES:
            return {
                ...state,
                quotes: action.payload,
                loading: false
            }
        case ADD_QUOTE:
            return {
                ...state,
                quotes: [action.payload, ...state.quotes]
            }
        case EDIT_QUOTE:
            return {
                ...state,
                quotes: [action.payload, ...state.quotes.filter(quote => quote._id !== action.payload._id)]
            }
        case DELETE_QUOTE: 
            console.log(`%c ${util.inspect(action.payload)} `, 'background: #222; color: #bada55');
            return {
                ...state,
                quotes: [...state.quotes.filter(quote => quote._id !== action.payload._id )]
            }
        case TOGGLE_MODAL:
            return {
                ...state,
                isModalOpen: !state.isModalOpen
            }
        default:
            return state
    }
}