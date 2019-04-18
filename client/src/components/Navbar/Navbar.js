import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import Avatar from '../Avatar/Avatar'
import Add from '../Add/Add'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutAdmin } from '../../actions/authActions'


class Navbar extends Component {

    onLogoutClick = event => {
        event.preventDefault()
        this.props.logoutAdmin()
    }

    render() {
        const { isAuthenticated, user } = this.props.auth

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded">
                <div className="container">
                    <a className="navbar-brand" href="#navbrand">Admin</a>
                        <ul className="navbar-nav navbar-left mr-auto">
                            <li className="nav-item active">
                                {isAuthenticated ? <Link to="/admin/dashboard" className="nav-link" href="#">Home</Link> : ''}
                            </li>
                        </ul>
                    {isAuthenticated ? <div className='navbar-right navbar'><Add /> <Avatar onLogoutClick={this.onLogoutClick} isAuthenticated={isAuthenticated} user={user} /></div> : null}
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
