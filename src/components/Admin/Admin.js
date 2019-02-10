import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from "react-router-dom";
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
    console.log(this.state.isAuthenticated)
  }


  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar isAuthenticated={this.state.isAuthenticated} />
          <div className='container'>
            <Route path='/admin' exact strict render={() => this.state.isAuthenticated ? (<Redirect to='/admin/dashboard' />) : (<Entry authenticateUser={this.authenticateUser} />)} />
            <Route exact path='/admin/dashboard' component={Dashboard} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default Admin