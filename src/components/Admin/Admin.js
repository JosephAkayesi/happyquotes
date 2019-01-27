import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
// import { BrowserRouter, Route } from 'react-router-dom'

class Admin extends Component {
  constructor() {
    super()

    this.state = {
      isAuthenticated: false
    }
  }

  authenticateUser = () => {
    this.setState({ isAuthenticated: true })
  }


  render() {
    return (
      <div>
        <Navbar isAuthenticated={this.state.isAuthenticated} />
        <div className='container'>
          {this.state.isAuthenticated ? <Dashboard /> : <Login authenticateUser={this.authenticateUser} />}
        </div>
      </div>
    )
  }
}

export default Admin