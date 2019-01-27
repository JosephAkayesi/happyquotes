import React, { Component } from 'react'
import Quotes from '../Quotes/Quotes'
import Footer from '../Footer/Footer'
import './Layout.css'

class Layout extends Component {
    render() {
        return (
            <div className='bgImg'>
                <div className='centered text-center align-items-center justify-content-center'>
                    <Quotes />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Layout
