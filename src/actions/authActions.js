import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthToken'
import jwtDecode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_ADMIN, GET_ADMINS } from "./types"

// Register Admin    
export const registerAdmin = (adminData, history) => dispatch => {
    axios.post('/api/admins/register', adminData)
        .then(res => {
            // Save token to localStorage
            const { token } = res.data
            // Set token to localStorage
            localStorage.setItem('jwtToken', token)
            // Set token to Authorization header
            setAuthorizationToken(token)
            // Decode token to get admin data
            const decoded = jwtDecode(token)
            // Set current admin
            dispatch(setCurrentAdmin(decoded))
        })
        .then(() => history.push('/admin/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
    console.log(history)
}

// Login - Get Admin Token
export const loginAdmin = (adminData, history) => dispatch => {
    axios.post('/api/admins/login', adminData)
        .then(res => {
            // Save token to localStorage
            const { token } = res.data
            // Set token to localStorage
            localStorage.setItem('jwtToken', token)
            // Set token to Authorization header
            setAuthorizationToken(token)
            // Decode token to get admin data
            const decoded = jwtDecode(token)
            // Set current admin
            dispatch(setCurrentAdmin(decoded))
        })
        .then(() => history.push('/admin/dashboard'))
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

// Update admin profile
export const updateAdminProfile = (imageToUpload, adminData) => dispatch => {
    axios.post('/api/admins/upload', imageToUpload)
            .then(res => adminData.image = res.data.url)
            .then(() => {
                axios.put('/api/admins', adminData)
                    .then(res => {
                        // Save token to localStorage
                        const { token } = res.data
                        // Set token to localStorage
                        localStorage.setItem('jwtToken', token)
                        // Set token to Authorization header
                        setAuthorizationToken(token)
                        // Decode token to get admin data
                        const decoded = jwtDecode(token)
                        // Set current admin
                        dispatch(setCurrentAdmin(decoded))
                    })
                    .catch(err => console.log(err))
            }) 
}

// Log admin out
export const logoutAdmin = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken')
    // Remove auth header for future request
    setAuthorizationToken(false)
    // Set current admin to {} which will set isAuthenticated to false
    dispatch(setCurrentAdmin({}))
}
