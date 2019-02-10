import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_ADMIN } from "./types"

// Register Admin    
export const registerAdmin = (adminData, history) => dispatch => {
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
    console.log(adminData)
    axios.post('/api/admins/login', adminData)
        .then(res => {
            // Save token to localStorage
            const { token } = res.data
            // Set token to localStorage
            localStorage.setItem('jwtToken', token)
            // Set toke to Authorization header
            setAuthorizationToken(token)
            // Decode token to get admin data
            const decoded = jwt_decode(token)
            // Set current admin
            dispatch(setCurrentAdmin(decoded))
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Set logged in admin
export const setCurrentAdmin = (decoded) => {
    return {
        type: SET_CURRENT_ADMIN,
        payload: decoded
    }
}