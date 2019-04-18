import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import quoteReducer from './quoteReducer'
import adminReducer from './adminReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    quote: quoteReducer,
    admins: adminReducer
})