import React, { Component } from 'react'

class Register extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            magicPassword: ''
        }
    }

    
    onInputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto bg-light mt-5 p-5 rounded">
                        <form>
                            <fieldset>
                                <legend className="display-4 pb-4">Register</legend>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={this.onInputChange} defaultValue={this.state.name} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={this.onInputChange} defaultValue={this.state.email} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={this.onInputChange} defaultValue={this.state.password} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input type="password" className="form-control" id="confirmPassword" placeholder="Enter password again" onChange={this.onInputChange} defaultValue={this.state.confirmPassword} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username" placeholder="Enter username" onChange={this.onInputChange} defaultValue={this.state.username} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="magicPassword">Magic Password</label>
                                    <input type="password" className="form-control" id="magicPassword" placeholder="Enter magic password" onChange={this.props.onInputChange} defaultValue={this.state.magicPassword} required />
                                    <small name="emailHelp" className="form-text text-muted">Contact your Administrator for your magic password</small>
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.props.authenticateUser}>Submit</button>
                                <button type="button" className="btn btn-link d-block" style={{ paddingLeft: '0%', marginLeft: '0%', textDecoration: 'none' }}><small className="form-text" onClick={this.props.toggleLoginOrRegisterComponent}>Login instead ?</small></button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register