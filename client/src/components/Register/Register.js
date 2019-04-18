import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { registerAdmin } from '../../actions/authActions'

class Register extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            magicPassword: '',
            errors: {}
        }
    }


    onInputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    onFormSubmit = (event) => {
        event.preventDefault()

        const adminData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            username: this.state.username,
            magicPassword: this.state.magicPassword,
        }

        this.props.registerAdmin(adminData, this.props.history)
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
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mx-auto bg-light mt-5 p-5 rounded'>
                        <form>
                            <fieldset>
                                <legend className='display-4 pb-4'>Register</legend>
                                <div className='form-group'>
                                    <label htmlFor='name'>Name</label>
                                    <input type='text' className={classnames('form-control', { 'is-invalid': errors.name })} id='name' placeholder='Enter name' onChange={this.onInputChange} defaultValue={this.state.name} />
                                    {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' className={classnames('form-control', { 'is-invalid': errors.email })} id='email' placeholder='Enter email' onChange={this.onInputChange} defaultValue={this.state.email} />
                                    {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' className={classnames('form-control', { 'is-invalid': errors.password })} id='password' placeholder='Enter password' onChange={this.onInputChange} defaultValue={this.state.password} />
                                    {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='confirmPassword'>Confirm Password</label>
                                    <input type='password' className={classnames('form-control', { 'is-invalid': errors.confirmPassword })} id='confirmPassword' placeholder='Enter password again' onChange={this.onInputChange} defaultValue={this.state.confirmPassword} />
                                    {errors.confirmPassword && (<div className='invalid-feedback'>{errors.confirmPassword}</div>)}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='username'>Username</label>
                                    <input type='text' className={classnames('form-control', { 'is-invalid': errors.username })} id='username' placeholder='Enter username' onChange={this.onInputChange} defaultValue={this.state.username} />
                                    {errors.username && (<div className='invalid-feedback'>{errors.username}</div>)}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='magicPassword'>Magic Password</label>
                                    <input type='password' className={classnames('form-control', { 'is-invalid': errors.magicPassword })} id='magicPassword' placeholder='Enter magic password' onChange={this.onInputChange} defaultValue={this.state.magicPassword} />
                                    {errors.magicPassword && (<div className='invalid-feedback'>{errors.magicPassword}</div>)}
                                    <small name='emailHelp' className='form-text text-muted'>Contact your Administrator for your magic password</small>
                                </div>
                                <button type='submit' className='btn btn-primary' onClick={this.onFormSubmit}>Submit</button>
                                <button type='button' className='btn btn-link d-block' style={{ paddingLeft: '0%', marginLeft: '0%', textDecoration: 'none' }}><small className='form-text' onClick={this.props.toggleLoginOrRegisterComponent}>Login instead ?</small></button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { registerAdmin })(withRouter(Register))