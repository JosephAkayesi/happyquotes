import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <p className='text-center' style={{ bottom: 0, color: 'black', width: '100%', position: 'fixed', display: 'block', zIndex: 100 }}>&copy; {new Date().getUTCFullYear()}&nbsp; | &nbsp;<Link to='/contributors' href='#contributors'>Contributors</Link></p>
    )
}

export default Footer;