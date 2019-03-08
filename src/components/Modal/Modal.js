import React, { Component } from 'react'
import classnames from 'classnames'
import './Modal.css'

class Modal extends Component {
    constructor(props) {
        super(props)


        this.state = {
            id: '',
            author: '',
            quote: '',
            errors: {}
        }
    }

    switchSaveChangesAction = () => {
        return this.props.state.index ? this.addNewQuote : this.updateExistingQuote
    }

    componentWillReceiveProps(nextProps) {
        console.log('receive props')
        this.setState({errors: {}})
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    render() {
        const { errors } = this.props.data
        const { isModalOpen } = this.props

        let selectedQuoteDetails = {
            id: this.props.data.index ? this.props.data.index : '',
            author: this.props.data.author ? this.props.data.author : '',
            quote: this.props.data.quote ? this.props.data.quote : ''
        };

        let modalInputValue = selectedQuoteDetails ? selectedQuoteDetails : this.state
        let saveChangesAction = this.props.data.index ? this.props.updateExistingQuote : this.props.addNewQuote
        let modalActionTitle = this.props.data.index ? 'Update Quote' : 'Add a Quote'
        return (
            <div className={classnames({'modal d-block': isModalOpen}, { 'modal d-none': !isModalOpen })}>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header bg-light'>
                            <h5 className='modal-title'><b>{modalActionTitle}</b></h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={this.props.toggleModalOpenOrClose}>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='author'>Author</label>
                                <input type='text' className={classnames('form-control', { 'is-invalid': errors.author })} id='author' aria-describedby='emailHelp' placeholder='Enter author' onChange={this.props.onInputChange} value={modalInputValue.author} />
                                {errors.author && (<div className='invalid-feedback'>{errors.author}</div>)}
                            </div>
                            <div className='form-group'>
                                <label htmlFor='quote'>Quote</label>
                                <textarea className={classnames('form-control', { 'is-invalid': errors.quote })} id='quote' rows='3' placeholder='Enter quote' onChange={this.props.onInputChange} value={modalInputValue.quote}></textarea>
                                {errors.quote && (<div className='invalid-feedback'>{errors.quote}</div>)}
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-primary' onClick={saveChangesAction}>Save changes</button>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={this.props.toggleModalOpenOrClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal