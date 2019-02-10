import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/admin/dashboard')
    }
    this.setState({isAuthenticated: this.props.auth.isAuthenticated})
  }

  render() {
    const { isAuthenticated } = this.state
    return (
      <BrowserRouter>
        <div>
          <Navbar isAuthenticated={isAuthenticated} />
          <div className='container'>
            <Route path='/admin' strict render={() => isAuthenticated ? (<Redirect to='/admin/dashboard' />) : (<Entry />)} />
            <Route path='/admin/dashboard' component={Dashboard} />
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