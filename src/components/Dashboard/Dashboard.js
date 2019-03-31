import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getQuotes, addQuote, editQuote, deleteQuote, clearErrors, toggleModalOpenOrClose } from '../../actions/quoteActions'
import Modal from '../Modal/Modal'
import Spinner from '../Spinner/Spinner'
import add from '../../images/add.png'
import addSelected from '../../images/addSelected.png'
import './Dashboard.css'

const TableRow = ({ row, openQuoteDetails, deleteQuote, admin }) => (
  <tr>
    <th scope='row' onClick={openQuoteDetails}>{row.author}</th>
    <td onClick={openQuoteDetails}>{row.quote}<small id='admin' className='form-text text-muted'>{row.admin.name}</small></td>
    <td>{row.admin._id === admin ? <i className='fa fa-close' onClick={deleteQuote}></i> : ''}</td>
  </tr>
)

const Table = ({ data, openQuoteDetails, deleteQuote, admin }) => (
  <table className='table table-hover'>
    <thead>
      <tr className='table-active'>
        <th scope='col'>Author</th>
        <th scope='col'>Quote</th>
        <th scope='col'></th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) =>
        <TableRow key={row._id} row={row} admin={admin} openQuoteDetails={() => openQuoteDetails(row)} deleteQuote={() => deleteQuote(row)} />
      )}
    </tbody>
  </table>
)

class Dashboard extends Component {
  constructor() {
    super()

    this.state = {
      quotes: [],
      addSource: add,
      isModalOpen: false,
      loading: false,
      index: '',
      author: '',
      quote: '',
      errors: {}
    }
  }

  onAddMouseOver = () => {
    this.setState({ addSource: addSelected })
  }

  onAddMouseOut = () => {
    this.setState({ addSource: add })
  }

  toggleModalOpenOrClose = () => {
    this.resetQuoteStateToEmpty()
    this.props.toggleModalOpenOrClose()
    this.props.clearErrors()
  }

  openQuoteDetails = (row) => {
    this.props.toggleModalOpenOrClose()
    this.setState({ index: row._id, author: row.author, quote: row.quote })
  }

  addNewQuote = () => {
    const { user } = this.props.auth

    const newQuote = {
      admin: user.id,
      quote: this.state.quote,
      author: this.state.author,
    }

    this.props.addQuote(newQuote)
  }

  updateExistingQuote = () => {
    this.setState({ errors: {} })

    const quoteData = {
      index: this.state.index,
      quote: this.state.quote,
      author: this.state.author
    }

    this.props.editQuote(quoteData)
  }

  deleteQuote = (row) => {
    this.setState({ isModalOpen: false })
    const quoteID = row._id
    this.props.deleteQuote(quoteID)
  }

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  resetQuoteStateToEmpty = () => {
    this.setState({ index: '' })
    this.setState({ author: '' })
    this.setState({ quote: '' })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
      this.setState({ isModalOpen: nextProps.quote.isModalOpen })
    }
  }

  componentDidMount() {
    this.props.getQuotes()
  }

  render() {
    const { quotes, loading } = this.props.quote
    const { user } = this.props.auth
    return (
      <div className='pt-3'>
        {loading ? <Spinner /> :
          <div>
            <Table
              data={quotes}
              admin={user.id}
              openQuoteDetails={this.openQuoteDetails}
              deleteQuote={this.deleteQuote} />
            <Modal
              isModalOpen={this.state.isModalOpen}
              toggleModalOpenOrClose={this.toggleModalOpenOrClose}
              data={this.state}
              onInputChange={this.onInputChange}
              addNewQuote={this.addNewQuote}
              updateExistingQuote={this.updateExistingQuote}
            />
          </div>
        }
      </div>
    )
  }
}

Dashboard.propTypes = {
  getQuotes: PropTypes.func.isRequired,
  addQuote: PropTypes.func.isRequired,
  editQuote: PropTypes.func.isRequired,
  deleteQuote: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  quote: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  quote: state.quote,
  errors: state.errors
})

export default connect(mapStateToProps, { getQuotes, addQuote, editQuote, deleteQuote, clearErrors, toggleModalOpenOrClose })(Dashboard)

