import { ADD_QUOTE, GET_QUOTES, QUOTE_LOADING } from '../actions/types'

const initialState = {
    quotes: [],
    quote: {},
    loading: false
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
        default:
            return state
    }
}