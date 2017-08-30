import React, { Component } from 'react'
import Controls from '../components/Controls.jsx'
import Results from '../components/Results.jsx'

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstHashtag: '',
            secondHashtag: '',
            firstHashtagValue: 0,
            secondHashtagValue: 0
        }
    }

    handleInput(event) {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit() {
        const {firstHashtag, secondHashtag} = this.state

        if (firstHashtag && secondHashtag) {
            this.handleRequest(firstHashtag, secondHashtag)
        }
    }

    handleRequest(first, second) {
        try {
            const ws = new WebSocket('ws://localhost:8080')
            // Track connection in state and update button 
            ws.onopen = () => ws.send(JSON.stringify({tags: [first, second]}))
            ws.onmessage = (e) => {
                let parsed = JSON.parse(e.data)
                this.setState({
                    firstHashtagValue: parsed[this.state.firstHashtag],
                    secondHashtagValue: parsed[this.state.secondHashtag]
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const {firstHashtagValue, secondHashtagValue} = this.state
        return (
            <div className='main-screen'>
                <Controls
                    handleInput={(event) => this.handleInput(event)}
                    handleSubmit={() => this.handleSubmit()}
                />
                <Results
                    firstHashtag={firstHashtagValue}
                    secondHashtag={secondHashtagValue}
                />
            </div>
        )
    }
}
