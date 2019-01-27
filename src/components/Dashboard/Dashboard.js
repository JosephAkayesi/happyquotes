import React, { Component } from 'react'
import Modal from '../Modal/Modal'
import add from '../../images/add.png'
import addSelected from '../../images/addSelected.png'
import './Dashboard.css'

const TableRow = ({ row, openQuoteDetails, deleteQuote }) => (
  <tr>
    <th scope="row" onClick={openQuoteDetails}>{row.author}</th>
    <td onClick={openQuoteDetails}>{row.quote}</td>
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
      quotes: [
        {
          "quote": "Our industry does not respect tradition - it only respects innovation.",
          "author": "Satya Nadella",
        },
        {
          "quote": "Engineering is the closest thing to magic that exists in the world.",
          "author": "Elon Musk",
        },
        {
          "quote": "For me, it matters that we drive technology as an equalizing force, as an enabler for everyone around the world.",
          "author": "Sundar Pichai",
        }
      ],
      addSource: add,
      isModalOpen: false,
      index: '',
      author: '',
      quote: ''
    }
  }

  onAddMouseOver = () => {
    this.setState({ addSource: addSelected })
  }

  onAddMouseOut = () => {
    this.setState({ addSource: add })
  }

  toggleModalOpenOrClose = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
    this.setState({ index: '' })
    this.setState({ author: '' })
    this.setState({ quote: '' })
  }

  openQuoteDetails = (row, index) => {
    this.setState({ isModalOpen: true });
    this.setState({ index: index, author: row.author, quote: row.quote })
    // this.setState({ index: index });
    // this.setState({ author: row.author });
    // this.setState({ quote: row.quote });
  }

  deleteQuote = (row, index) => {
    this.setState({ isModalOpen: false })
    console.log('Row deleted')
    console.log(this.state.quotes.splice(index, 1))
  }


  addNewQuote = () => {
    let quote = {
      "quote": this.state.quote,
      "author": this.state.author,
    }
    console.log('Add New')
    let quotes = this.state.quotes.concat(quote)
    this.setState({ quotes: quotes })
  }

  updateExistingQuote = (index) => {
    console.log('Update Existing')
    console.log(this.state.quotes[this.state.index])

    let copyOfQuotesState = this.state.quotes

    copyOfQuotesState[this.state.index].quote = this.state.quote
    copyOfQuotesState[this.state.index].author = this.state.author
    this.setState({ quotes: copyOfQuotesState })
  }

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  render() {
    return (
      <div className='pt-3'>
        <Table
          data={this.state.quotes}
          openQuoteDetails={this.openQuoteDetails}
          deleteQuote={this.deleteQuote} />
        <div className='text-center align-items-center justify-content-centerpt-5'>
          <a href='#add' onClick={this.toggleModalOpenOrClose}>
            <img src={this.state.addSource} className='addButton mx-1' alt="add" onMouseOver={this.onAddMouseOver} onMouseOut={this.onAddMouseOut} />
          </a>
        </div>
        <Modal
          isModalOpen={this.state.isModalOpen}
          toggleModalOpenOrClose={this.toggleModalOpenOrClose}
          state={this.state}
          onInputChange={this.onInputChange}
          addNewQuote={this.addNewQuote}
          updateExistingQuote={this.updateExistingQuote} />
      </div>
    )
  }
}

export default Dashboard
