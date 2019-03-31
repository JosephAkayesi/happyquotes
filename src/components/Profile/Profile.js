import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateAdminProfile } from '../../actions/authActions'
import axios from 'axios'

class Profile extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            name: '',
            displayImage: '',
            uploadImage: ''
        }
    }

    handleChange = (event) => {
        this.setState({ displayImage: URL.createObjectURL(event.target.files[0]) })

        let reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        console.log(reader)
        reader.onload = (event) => {
            console.log(event.target.result)
            this.setState({ uploadImage: event.target.result })
        }
    }

    editAvatar = () => {
        this.refs.imageUploadButton.click()
    }

    componentDidMount() {
        this.setState({ displayImage: this.props.user.avatar })
        this.setState({ name: this.props.user.name })
        this.setState({ username: this.props.user.username })
    }

    componentWillReceiveProps = nextProps => {
        console.log(nextProps)
    }

    onFormSubmit = () => {
        console.log('save')

        let updatedProfileData = {
            image: '',
            name: this.state.name,
            username: this.state.username
        }

        let imageToUpload = {
            image: this.state.uploadImage
        }

        console.log(updatedProfileData)
        // axios.post('/api/admins/upload', imageToUpload)
        //     .then(res => updatedProfileData.image = res.data.url)
        //     .then(() => {
        //         axios.put('/api/admins', updatedProfileData)
        //             .then(res => console.log(res.data))
        //             .catch(err => console.log(err))
        //     }) 

        this.props.updateAdminProfile(imageToUpload, updatedProfileData)
    }

    onInputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    cancelProfileUpdate = () => {
        console.log('cancel profile update')
        this.setState({ displayImage: this.props.user.avatar })
        this.setState({ name: this.props.user.name })
        this.setState({ username: this.props.user.username })

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto mt-1 pt-1 px-5 pb-1 rounded text-center">
                        <div className="container">
                            <div>
                                <img className="row mx-auto d-block" href="#" style={{ height: '250px', width: '250px', borderRadius: '100%', verticalAlign: 'middle', objectFit: 'cover' }} src={this.state.displayImage} alt="avatar" title='Default avatar is your Gravatar' />
                                <button type="file" style={{ padding: '0rem 0.375rem' }} className="btn btn-link" onClick={this.editAvatar}><small className="form-text">Edit</small></button>
                                <input type="file" className="form-control d-none invisible" onChange={(event) => this.handleChange(event)} ref="imageUploadButton" />
                            </div>
                        </div>
                        <form>
                            <fieldset>
                                <div className="form-group pt-5">
                                    <label htmlFor='author'>Name</label>
                                    <input type='text' className='form-control' id='name' aria-describedby='emailHelp' placeholder='Enter name' value={this.state.name} onChange={this.onInputChange} />
                                </div>
                                <div classNames="form-group pt-2">
                                    <label htmlFor='author'>Username</label>
                                    <input type='text' className='form-control btn-min-width' id='username' placeholder='Enter username' value={this.state.username} onChange={this.onInputChange} />
                                </div>
                            </fieldset>
                        </form>

                        <div class="btn-toolbar d-block justify-content-center p-2 mt-2">
                            <div class="btn-group mr-2 mb-2">
                                <button type="button" class="btn btn-success" onClick={this.onFormSubmit}>Save</button>
                            </div>
                            <div class="btn-group mr-2 mb-2">
                                <button type="button" class="btn btn-outline-danger" onClick={this.cancelProfileUpdate} >Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
Profile.propTypes = {
    updateAdminProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { updateAdminProfile })(Profile)
