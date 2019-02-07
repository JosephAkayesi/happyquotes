import React, { Component } from 'react'
import Login from '../Login/Login'
import Register from '../Register/Register'

class Entry extends Component {
    constructor() {
        super()

        this.state = {
            isLogin: true
        }
    }

    toggleLoginOrRegisterComponent = () => {
        console.log('Clicked')
        this.setState({ isLogin: !this.state.isLogin })
    }

    render() {
        return (
            <div>
                {this.state.isLogin ?
                    <Login onInputChange={this.onInputChange} toggleLoginOrRegisterComponent={this.toggleLoginOrRegisterComponent} authenticateUser={this.props.authenticateUser}/>
                    :
                    <Register onInputChange={this.onInputChange} toggleLoginOrRegisterComponent={this.toggleLoginOrRegisterComponent} authenticateUser={this.props.authenticateUser}/>
                }
            </div>
        )
    }
}

export default Entry
