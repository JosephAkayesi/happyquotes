import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addQuote, getQuotes, clearErrors, toggleModalOpenOrClose } from '../../actions/quoteActions'
import Modal from '../Modal/Modal'
import Spinner from '../Spinner/Spinner'
import add from '../../images/add.png'
import addSelected from '../../images/addSelected.png'
import './Dashboard.css'

const TableRow = ({ row, openQuoteDetails, deleteQuote }) => (
  <tr>
    <th scope="row" onClick={openQuoteDetails}>{row.author}</th>
    <td onClick={openQuoteDetails}>{row.quote}<small id="admin" className="form-text text-muted">{row.admin.name}</small></td>
    <td><i className="fa fa-close" onClick={deleteQuote}></i></td>
  </tr>
)

const Table = ({ data, openQuoteDetails, deleteQuote }) => (
  <table className="table table-hover">
    <thead>
      <tr className="table-active">
        <th scope="col">Author</th>
        <th scope="col">Quote</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) =>
        <TableRow key={index} row={row} openQuoteDetails={() => openQuoteDetails(row, index)} deleteQuote={() => deleteQuote(row, index)} />
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
    // this.setState({ index: '' })
    // this.setState({ author: '' })
    // this.setState({ quote: '' })
    this.resetQuoteStateToEmpty()
    // this.setState({ isModalOpen: !this.state.isModalOpen })
    this.props.toggleModalOpenOrClose()
    this.props.clearErrors()
  }

  openQuoteDetails = (row, index) => {
    // this.setState({ isModalOpen: true });
    this.props.toggleModalOpenOrClose()
    this.setState({ index: index, author: row.author, quote: row.quote })
  }

  addNewQuote = () => {
    console.log('add new')
    const { user } = this.props.auth

    const newQuote = {
      admin: user.id,
      quote: this.state.quote,
      author: this.state.author,
    }

    this.props.addQuote(newQuote)
  }

  updateExistingQuote = () => {
    console.log('Update Existing')
    this.setState({ errors: {} })
    console.log('empty')
  }

  deleteQuote = (row, index) => {
    this.setState({ isModalOpen: false })
    console.log('Row deleted')
    console.log(this.state.quotes.splice(index, 1))
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
    console.log('receive props')
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
      this.setState({isModalOpen: nextProps.quote.isModalOpen})
    }
  }

  componentDidMount() {
    this.props.getQuotes()
  }

  render() {
    const { quotes, loading } = this.props.quote

    return (

      <div className='pt-3'>
        {loading ? <Spinner /> :
          <div>
            <Table
              data={quotes}
              openQuoteDetails={this.openQuoteDetails}
              deleteQuote={this.deleteQuote} />
              {/* Add image button will be removed since Add Quote functionality has been sent to the navbar */}
            {/* <div className='text-center align-items-center justify-content-centerpt-5'>
              <a href='#add' onClick={this.toggleModalOpenOrClose}>
                <img src={this.state.addSource} className='addButton mx-1' alt="add" onMouseOver={this.onAddMouseOver} onMouseOut={this.onAddMouseOut} />
              </a>
            </div> */}
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
  addQuote: PropTypes.func.isRequired,
  getQuotes: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { addQuote, getQuotes, clearErrors, toggleModalOpenOrClose })(Dashboard)

