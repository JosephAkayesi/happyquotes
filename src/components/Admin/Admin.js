import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
// import { BrowserRouter, Route } from 'react-router-dom'

class Admin extends Component {
  constructor() {
    super()

    this.state = {
      isAuthenticated: false,
      usernameOrEmail: '',
      password: ''
    }
  }

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
}

  authenticateUser = (event) => {
    event.preventDefault()
    console.log('pressed')

    // console.log(this.state.usernameOrEmail.trim())
    // console.log(this.state.password)

    // let userCredentials = { 'usernameOrEmail': this.state.usernameOrEmail.trim(), 'password': this.state.password}
    // console.log(JSON.stringify(userCredentials))
    // console.log(userCredentials)
    this.setState({ isAuthenticated: true })
  }


  render() {
    return (
      <div>
        <Navbar isAuthenticated={this.state.isAuthenticated} />
        <div className='container'>
          {
            this.state.isAuthenticated ? 
            <Dashboard /> 
            : 
            <Login usernameOrEmail={this.state.usernameOrEmail} password={this.state.password} authenticateUser={this.authenticateUser} onInputChange={this.onInputChange} />
          }
        </div>
      </div>
    )
  }
}

export default Admin