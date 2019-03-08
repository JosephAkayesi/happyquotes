import React, { Component } from 'react'

class Spinner extends Component {
    render() {
        return (
            <div>
                <div className="text-center">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Spinner