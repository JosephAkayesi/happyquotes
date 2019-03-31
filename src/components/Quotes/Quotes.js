import React, { Component } from 'react'
import Pattern from '../Pattern/Pattern'
import Spinner from '../Spinner/Spinner'

class Quotes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            quotes: [],
            currentQuote: {}
        }
    }

    setFirstQuote = () => {
        let index = Math.floor(Math.random() * (this.state.quotes.length))
        this.setState({ currentQuote: this.state.quotes[index] })
    }

    randomiseQuotes = () => {
        setInterval(() => {
            let index = Math.floor(Math.random() * (this.state.quotes.length))
            this.setState({ currentQuote: this.state.quotes[index] })
        }, 5000)
    }

    componentDidMount() {
        this.randomiseQuotes();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.quotes) {
            this.setState({ quotes: nextProps.quotes })
        }
        this.setFirstQuote()
    }

    render() {
        return (
            <div>
                {this.state.currentQuote ?
                    <div>
                        <h1 className='quote' style={{ color: 'black' }}>{this.state.currentQuote.quote}</h1>
                        <p style={{ color: 'black' }} ><em>- {this.state.currentQuote.author}</em></p>
                        <Pattern />
                    </div>
                    :
                    <Spinner />
                }
            </div>
        )
    }
}

export default Quotes
