import { ADD_QUOTE, GET_QUOTES, QUOTE_LOADING, TOGGLE_MODAL } from '../actions/types'

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
        case TOGGLE_MODAL:
            return {
                ...state,
                isModalOpen: !state.isModalOpen
            }
        default:
            return state
    }
}