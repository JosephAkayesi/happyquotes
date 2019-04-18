import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { toggleModalOpenOrClose } from '../../actions/quoteActions'

class Add extends Component {
    toggleModalOpenOrClose = () => {
        this.props.toggleModalOpenOrClose()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ isModalOpen: nextProps.quote.isModalOpen })
        }
    }

    render() {
        return (
            <ul className='navbar-nav ml-auto px-2'>
                <li className='nav-item'>
                    <a href='#addQuote' onClick={this.toggleModalOpenOrClose}>Add Quote</a>
                </li>
            </ul>
        )
    }
}

Add.propTypes = {
    toggleModalOpenOrClose: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    quote: state.quote,
})

export default connect(mapStateToProps, { toggleModalOpenOrClose })(withRouter(Add));
