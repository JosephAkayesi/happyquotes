import axios from 'axios'
import { GET_ADMINS, ADMIN_LOADING } from "./types"


// Get all admins
export const getAdmins = () => dispatch => {
    dispatch(setAdminsLoading())
    axios.get('/api/admins')
        .then(res => {
            dispatch({
                type: GET_ADMINS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ADMINS,
                payload: null
            })
        }
    )
}

// Set admins loading state
export const setAdminsLoading = () => {
    return {
        type: ADMIN_LOADING
    }
}
