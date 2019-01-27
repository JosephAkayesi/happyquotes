import React, { Component } from 'react'
import './Modal.css'

class Modal extends Component {
    constructor() {
        super()

        this.state = {
            author: '',
            quote: ''
        }
    }

    switchSaveChangesAction = () => {
        return this.props.state.index ? this.props.addNewQuote : this.props.updateExistingQuote
    }

    render() {
        let showOrHideModal = this.props.isModalOpen ? 'modal d-block' : 'modal d-none'

        let selectedQuoteDetails = {
            id: this.props.state.index ? this.props.state.index : '',
            author: this.props.state.author ? this.props.state.author : '',
            quote: this.props.state.quote ? this.props.state.quote : ''
        };

        let modalInputValue = selectedQuoteDetails ? selectedQuoteDetails : this.props.state
        let saveChangesAction = this.props.state.index ? this.props.updateExistingQuote : this.props.addNewQuote
        return (
            <div className={showOrHideModal}>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header bg-light'>
                            <h5 className='modal-title'><b>Add a Quote</b></h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={this.props.toggleModalOpenOrClose}>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='author'>Author</label>
                                <input type='text' className='form-control' id='author' aria-describedby='emailHelp' placeholder='Enter author' onChange={this.props.onInputChange} value={modalInputValue.author} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='quote'>Quote</label>
                                <textarea className='form-control' id='quote' rows='3' placeholder='Enter quote' onChange={this.props.onInputChange} value={modalInputValue.quote} ></textarea>
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