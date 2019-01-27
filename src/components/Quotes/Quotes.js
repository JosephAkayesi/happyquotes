import React, { Component } from 'react'
import Pattern from '../Pattern/Pattern'

class Quotes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            quotes: [
                {
                    "quote": "Our industry does not respect tradition - it only respects innovation.",
                    "author": "Satya Nadella",
                    "position": "CEO of Microsoft"
                },
                {
                    "quote": "Engineering is the closest thing to magic that exists in the world.",
                    "author": "Elon Musk",
                    "position": "Tesla and SpaceX CEO"
                },
                {
                    "quote": "For me, it matters that we drive technology as an equalizing force, as an enabler for everyone around the world.",
                    "author": "Sundar Pichai",
                    "position": "CEO of Google"
                }
            ],

            currentQuote: {}
        }
    }

    setFirstQuote = () => {
        let index = Math.floor(Math.random() * (this.state.quotes.length))
        this.setState({ currentQuote: this.state.quotes[index] })
    }

    randomiseQuotes = () => {
        setTimeout(() => {
            let index = Math.floor(Math.random() * (this.state.quotes.length))
            this.setState({ currentQuote: this.state.quotes[index] })
        }, 5000)
    }

    componentDidMount(){
        this.setFirstQuote()
    }

    render() {
        this.randomiseQuotes()
        return (
            <div>
                <h1 className='quote' style={{ color: 'black' }}>{this.state.currentQuote.quote}</h1>
                <p style={{ color: 'black' }} ><em>- {this.state.currentQuote.author}</em></p>
                <Pattern />
            </div>
        )
    }
}

export default Quotes
