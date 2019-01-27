import React from 'react'
import pattern from '../../images/pattern.png'

const Pattern = () => {
    return (
        <div className='pt-1'>
                <img src={pattern} className='social mx-1' alt="twitter" />
                <img src={pattern} className='social mx-1' alt="facebook" />
                <img src={pattern} className='social mx-1' alt="instagram" />
        </div>
    )
}

export default Pattern 
