import React, { Component } from 'react'
import avatar from '../../images/avatar.jpg'

class Avatar extends Component {
    render() {
        const showOrHideAvatar = this.props.isAuthenticated ? 'dropdown show d-block': 'dropdown show d-none'
        return (
            <div className={showOrHideAvatar}>
                <img className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ height: '40px', width: '40px', borderRadius: '100%', verticalAlign: 'middle' }} src={avatar} alt="avatar" />
                <div className="dropdown-menu dropdown-menu-center" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item py-2 adminDetails" href="#admin"><b>@tutcanAdmin</b></a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#logout">Logout</a>
                </div>
            </div>
        )
    }
}

export default Avatar