import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super()

        this.state = {
            usernameOrEmail: '',
            password: ''
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
                                <legend className="display-4 pb-4">Login</legend>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="usernameOrEmail" placeholder="Enter email" onChange={this.onInputChange} defaultValue={this.state.usernameOrEmail} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.onInputChange} defaultValue={this.state.password} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.props.authenticateUser}>Submit</button>
                                <button type="button" className="btn btn-link d-block" style={{ paddingLeft: '0%', marginLeft: '0%', textDecoration: 'none' }}><small className="form-text" onClick={this.props.toggleLoginOrRegisterComponent}>Register instead ?</small></button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
