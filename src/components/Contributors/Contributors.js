import React, { Component } from 'react'
import Spinner from '../Spinner/Spinner'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAdmins } from '../../actions/adminActions'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

const Navbar = () => (
  <nav className='navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded'>
    <div className='container'>
      <a className='navbar-brand' href='#navbrand'>Contributors</a>
      <div className='collapse navbar-collapse' id='navbarColor02'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to='/' className='nav-link' href='#'>Back to Layout</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

class Contributors extends Component {
  constructor() {
    super()

    this.state = {
      admins: [],
      loading: false
    }
  }

  componentDidMount() {
    this.props.getAdmins()
  }

  render() {
    const { admins, loading } = this.props.admins
    return (
      <div>
        <Navbar />
        {loading ? <Spinner /> :
          <div className='container'>
            {admins.map((admin, key) => {
              console.log(admin)
              return (
                <div key={key} className='d-inline-flex flex-nowrap m-2'>
                  <img href='#' role='button' data-tip={admin.name} style={{ height: '40px', width: '40px', borderRadius: '100%', verticalAlign: 'middle' }} src={admin.avatar} alt='avatar' />
                  <ReactTooltip />
                </div>)
            })}
          </div>
        }
      </div>
    )
  }
}

Contributors.propTypes = {
  getAdmins: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  admins: state.admins
})

export default connect(mapStateToProps, { getAdmins })(Contributors)