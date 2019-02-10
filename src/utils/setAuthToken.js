import axios from 'axios'

const setAuthorizationToken = token => {
    if(token){
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token
    }
    else {
        //Delete authrization header
        axios.defaults.headers.common['Authorization ']
    }
}

export default setAuthorizationToken