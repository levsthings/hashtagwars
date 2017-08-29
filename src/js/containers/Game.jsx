import React, { Component } from 'react'
import Controls from '../components/Controls.jsx'
import Results from '../components/Results.jsx'

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstHashtag: '',
            secondHashtag: ''
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
            console.log(firstHashtag, secondHashtag)
        }
    }

    handleRequest() {
        const {firstHashtag, secondHashtag} = this.state
        console.log(`[${firstHashtag}, ${secondHashtag}]`)
        try {
            const ws = new WebSocket('ws://localhost:8080')
            setTimeout(() => {
                ws.send(JSON.stringify({tags: [firstHashtag, secondHashtag]}))
            }, 3000)
            ws.onmessage = e => console.log(e)
        } catch (error) {
            console.log(error)
        }
    }
    // TODO: 
    //      1- Pass update and request functions down to Controls
    //      2- Update state
    //      3- Pass state as props to Results
    render() {
        const {firstHashtag, secondHashtag} = this.setState
        return (
            <div className='main-screen'>
                <Controls
                    handleInput={(event) => this.handleInput(event)}
                    handleSubmit={() => this.handleSubmit()}
                />
                <Results
                    firstHashtag={firstHashtag}
                    secondHashtag={secondHashtag}
                />
            </div>
        )
    }
}
