import React, { Component } from 'react'
import Quotes from '../Quotes/Quotes'
import Footer from '../Footer/Footer'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getQuotes } from '../../actions/quoteActions'
import './Layout.css'

class Layout extends Component {
    componentDidMount() {
        this.props.getQuotes()
        // this.setFirstQuote()
    }

    render() {
        const { quotes } = this.props.quote
        
        return (
            <div className='bgImg'>
                <div className='centered text-center align-items-center justify-content-center'>
                    <Quotes quotes={quotes}/>
                </div>
                <Footer />
            </div>
        )
    }
}

Layout.propTypes = {
    quote: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    quote: state.quote,
})

export default connect(mapStateToProps, { getQuotes })(Layout)
