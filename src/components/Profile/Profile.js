import React, { Component } from 'react'
import axios from 'axios'

class Profile extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            name: '',
            image: ''
        }
    }

    displayImageToUpload = (event) => {
        event.preventDefault()
        // console.log('display image')
        // console.log(event.target.files[0].name)

        // console.log(event.target.files)
        let image = event.target.files
        console.log(image[0])
        let reader = new FileReader()
        reader.readAsDataURL(image[0])

        // axios.post('api/admins/upload', imageToUpload)
        //         .then(res => res.json(res))
        //         .catch(err => console.log(err))
        reader.onload = (event) => {

            let imageToUpload = {
                image: event.target.result
            }
            
            console.log(imageToUpload)
            axios.post('/api/admins/upload', imageToUpload)
                .then(res => res.json(res))
                .catch(err => console.log(err))

        }

       
    }

    componentDidMount() {
        this.setState({ image: 'http://res.cloudinary.com/tutcan/image/upload/v1553299222/w1x9ghflc0pupbx9ywbm.jpg' })
    }

    // onChange={(event) => displayImageToUpload(event)}
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto mt-1 pt-1 px-5 pb-1 rounded text-center">
                        <div className="container">
                            <div>
                                {/* <img className="row mx-auto d-block" href="#" style={{ height: '250px', width: '250px', borderRadius: '100%', verticalAlign: 'middle' }} src={this.props.user.avatar} alt="avatar" title='Default avatar is your Gravatar' /> */}
                                <img className="row mx-auto d-block" href="#" style={{ height: '250px', width: '250px', borderRadius: '100%', verticalAlign: 'middle' }} src={this.state.image} alt="avatar" title='Default avatar is your Gravatar' />
                                <button type="file" style={{ padding: '0rem 0.375rem' }} className="btn btn-link"><small className="form-text" onClick={this.openUserHome}>Edit</small></button>
                                <input type="file" className="form-control" onChange={this.displayImageToUpload} />
                            </div>
                        </div>
                        <form>
                            <fieldset>
                                <div className="form-group pt-5">
                                    <label htmlFor='author'>Name</label>
                                    <input type='text' className='form-control' id='author' aria-describedby='emailHelp' placeholder='Enter author' defaultValue={this.props.user.name} />
                                </div>
                                <div classNames="form-group pt-2">
                                    <label htmlFor='author'>Username</label>
                                    <input type='text' className='form-control btn-min-width' id='author' aria-describedby='emailHelp' placeholder='Enter author' defaultValue={this.props.user.username} />
                                </div>
                            </fieldset>
                        </form>

                        <div class="btn-toolbar d-block justify-content-center p-2">
                            <div class="btn-group mr-2 mb-2">
                                <button type="button" class="btn btn-success" id="downloadButton" >Save</button>
                            </div>
                            <div class="form-group">
                                <input type="file" id="uploadImage" className='d-none' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Profile