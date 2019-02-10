import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthToken'
import { GET_ERRORS } from "./types"

// Register Admin    
export const registerAdmin = (adminData,history) => dispatch => {
    axios.post('/api/admins/register', adminData)
        .then(res => history.push('/admin/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Login - Get Admin Token
export const loginAdmin = adminData => dispatch => {
    axios.post('/api/users/login', adminData)
        .then(res => {
            // Save token to localStorage
            const {token} = res.data
            // Set token to localStorage
            localStorage.setItem('jwtToken', token)
            // Set toke to Authorization header
            setAuthorizationToken(token)
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}