import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import Entry from '../Entry/Entry'
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
                <Entry />
            }
          </div>
        </div>
    )
  }
}

export default Admin