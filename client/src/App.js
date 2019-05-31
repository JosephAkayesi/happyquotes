import jwtDecode from 'jwt-decode'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from "react-router-dom"
import { logoutAdmin, setCurrentAdmin } from './actions/authActions'
import Admin from './components/Admin/Admin'
import Layout from "./components/Layout/Layout"
import Contributors from './components/Contributors/Contributors'
import store from './store'
import setAuthorizationToken from './utils/setAuthToken'

// Check for token
if (localStorage.jwtToken) {
  // Set authorization token header
  setAuthorizationToken(localStorage.jwtToken)
  // Decode token and get user info and exp
  const decoded = jwtDecode(localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentAdmin(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout admin
    store.dispatch(logoutAdmin())
    // TODO: Clear current profile
    // Redirect to login
    window.location.href = '/admin'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Layout} />
            <Route exact path='/admin' component={Admin} />
            <Route exact path='/contributors' component={Contributors} />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App