import React, { Component } from 'react'
import './Navbar.css'
import Avatar from '../Avatar/Avatar'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded">
                <div className="container">
                    <a className="navbar-brand" href="#navbrand">Admin</a>
                    <Avatar isAuthenticated={this.props.isAuthenticated} />
                </div>
            </nav>
        )
    }
}

export default Navbar
