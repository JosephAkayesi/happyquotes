import axios from 'axios'

const setAuthorizationToken = token => {
    if(token){
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token
    }
    else {
        //Delete authrization header
        delete axios.defaults.headers.common['Authorization ']
    }
}

export default setAuthorizationToken