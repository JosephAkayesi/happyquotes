import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Redirect, Route } from "react-router-dom"
import Dashboard from '../Dashboard/Dashboard'
import Profile from '../Profile/Profile'
import Entry from '../Entry/Entry'
import Navbar from '../Navbar/Navbar'

class Admin extends Component {
  constructor() {
    super()

    this.state = {
      isAuthenticated: false,
      usernameOrEmail: '',
      password: ''
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/admin/dashboard')
    }
    this.setState({ isAuthenticated: this.props.auth.isAuthenticated })
  }

  render() {
    const { isAuthenticated, user } = this.props.auth
    return (
      <BrowserRouter>
        <div>
          <Navbar isAuthenticated={isAuthenticated} />
          <div className='container'>
            <Route exact path='/admin' render={() => isAuthenticated ? (<Redirect to='/admin/dashboard' />) : (<Entry />)} />
            <Route exact path='/admin/dashboard' render={() => isAuthenticated ? (<Dashboard />) : (<Redirect to='/admin' />)} />
            <Route exact path='/admin/profile' render={() => isAuthenticated ? (<Profile user={user} />) : (<Redirect to='/admin' />)} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

Admin.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(Admin)