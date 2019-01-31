import React, { Component } from 'react';

class Login extends Component {
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
                                    <input type="text" className="form-control" id="usernameOrEmail" placeholder="Enter email" onChange={this.props.onInputChange} value={this.props.usernameOrEmail} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.props.onInputChange} value={this.props.password} required />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.props.authenticateUser}>Submit</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
