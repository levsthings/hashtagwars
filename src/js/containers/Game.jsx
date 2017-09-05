import React, { Component } from 'react'
import Controls from '../components/Controls.jsx'
import Results from '../components/Results.jsx'
import Notifications from '../components/Notifications.jsx'
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
            isCloseEmitted: false,
            notification: {
                state: false,
                title: '',
                message: ''
            }
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
        const ws = new WebSocket('ws://localhost:8081')

        ws.onopen = () => {
            ws.send(JSON.stringify({tags: [first, second]}))
            this.setState({
                socketConnection: true,
                notification: {
                    state: true,
                    title: 'Notification',
                    message: 'Connection established.'
                }
            })
        }

        ws.onmessage = (e) => {
            const parsed = JSON.parse(e.data)
            this.setState({
                firstHashtagValue: parsed[this.state.firstHashtag],
                secondHashtagValue: parsed[this.state.secondHashtag]
            })
            // If close request is emitted, close on next message event
            if (this.state.isCloseEmitted) ws.close()
        }

        ws.onclose = () => {
            this.setState({
                socketConnection: false,
                isCloseEmitted: false,
                notification: {
                    state: true,
                    title: 'Notification',
                    message: 'Connection closed.'
                }
            })
        }

        ws.onerror = () => {
            this.setState({
                notification: {
                    state: true,
                    title: 'Error',
                    message: 'Could not establish connection, try again later.'
                }
            })
            ws.close()
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
            socketConnection,
            notification
        } = this.state

        return (
            <div className='htw-main-screen'>
                <Controls
                    handleInput={event => this.handleInput(event)}
                    handleSubmit={() => this.handleSubmit()}
                    socketConnection={socketConnection}
                    emitCloseRequest={() => this.emitCloseRequest()}
                />
                <Results
                    firstHashtag={firstHashtag}
                    firstHashtagValue={firstHashtagValue}
                    secondHashtag={secondHashtag}
                    secondHashtagValue={secondHashtagValue}
                />
                <Notifications
                    notification={notification}
                />
            </div>
        )
    }
}
