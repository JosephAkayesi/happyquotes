import React, { Component } from 'react'
import './Navbar.css'
import Avatar from '../Avatar/Avatar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutAdmin } from '../../actions/authActions'

class Navbar extends Component {
    onLogoutClick = event => {
        event.preventDefault()
        console.log('Admin logged out')
        this.props.logoutAdmin()
    }

    render() {
        const { isAuthenticated, user } = this.props.auth

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded">
                <div className="container">
                    <a className="navbar-brand" href="#navbrand">Admin</a>
                    {isAuthenticated ? <Avatar onLogoutClick={this.onLogoutClick} isAuthenticated={isAuthenticated} user={user}/> : null}
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutAdmin })(Navbar)
