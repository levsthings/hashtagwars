import React, { Component } from 'react'
import Controls from '../components/Controls.jsx'
import Results from '../components/Results.jsx'
// import throttle from 'lodash/throttle'

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstHashtag: '',
            secondHashtag: '',
            firstHashtagValue: 0,
            secondHashtagValue: 0,
            socketConnection: false,
            isCloseEmitted: false
        }
    }

    handleInput(event) {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit() {
        const {firstHashtag, secondHashtag, socketConnection} = this.state

        if (firstHashtag && secondHashtag && !socketConnection) {
            this.handleRequest(firstHashtag, secondHashtag)
        }
    }

    handleRequest(first, second) {
        try {
            const ws = new WebSocket('ws://localhost:8080')

            ws.onopen = () => {
                ws.send(JSON.stringify({tags: [first, second]}))
                this.setState({socketConnection: true})
            }
            ws.onmessage = (e) => {
                let parsed = JSON.parse(e.data)
                this.setState({
                    firstHashtagValue: parsed[this.state.firstHashtag],
                    secondHashtagValue: parsed[this.state.secondHashtag]
                })
            }
            ws.onclose = () => {
                this.setState({
                    socketConnection: false,
                    isCloseEmitted: false
                })
                console.log('connection closed')
            }
            if (this.state.isCloseEmitted === true) {
                ws.close()
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    emitCloseRequest() {
        this.setState({
            isCloseEmitted: true
        })
    }
    render() {
        const {firstHashtagValue,
            secondHashtagValue,
            firstHashtag,
            secondHashtag,
            socketConnection
        } = this.state
        return (
            <div className='htw-main-screen'>
                <Controls
                    handleInput={(event) => this.handleInput(event)}
                    handleSubmit={() => this.handleSubmit()}
                    
                    socketConnection={socketConnection}
                />
                <Results
                    firstHashtag={firstHashtag}
                    firstHashtagValue={firstHashtagValue}
                    secondHashtag={secondHashtag}
                    secondHashtagValue={secondHashtagValue}
                />
            </div>
        )
    }
}
