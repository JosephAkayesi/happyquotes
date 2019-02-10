import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginAdmin } from '../../actions/authActions'


class Login extends Component {
    constructor() {
        super()

        this.state = {
            usernameOrEmail: '',
            password: '',
            errors: {}
        }
    }

    onInputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    onFormSubmit = (event) => {
        event.preventDefault()

        const adminData = {
            usernameOrEmail: this.state.usernameOrEmail,
            password: this.state.password
        }

        this.props.loginAdmin(adminData)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/admin/dashboard')
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }
    render() {
        const { errors } = this.state

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto bg-light mt-5 p-5 rounded">
                        <form>
                            <fieldset>
                                <legend className="display-4 pb-4">Login</legend>
                                <div className="form-group">
                                    <label htmlFor="usernameOrEmail">Username or Email</label>
                                    <input type="text" className={classnames('form-control', { 'is-invalid': errors.usernameOrEmail })} id="usernameOrEmail" placeholder="Enter username or email" onChange={this.onInputChange} defaultValue={this.state.usernameOrEmail} />
                                    {errors.usernameOrEmail && (<div className='invalid-feedback'>{errors.usernameOrEmail}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className={classnames('form-control', { 'is-invalid': errors.password })} id="password" placeholder="Password" onChange={this.onInputChange} defaultValue={this.state.password} />
                                    {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.onFormSubmit}>Submit</button>
                                <button type="button" className="btn btn-link d-block" style={{ paddingLeft: '0%', marginLeft: '0%', textDecoration: 'none' }}><small className="form-text" onClick={this.props.toggleLoginOrRegisterComponent}>Register instead ?</small></button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginAdmin })(withRouter(Login));
