import { GET_ADMINS, ADMIN_LOADING } from '../actions/types'
// import isEmpty from '../validation/isEmpty'

const initialState = {
    admins: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADMIN_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_ADMINS:
            return {
                ...state,
                admins: action.payload,
                loading: false
            }
        default:
            return state
    }
} 