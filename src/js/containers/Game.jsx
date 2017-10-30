import React, {Component} from 'react'
import Controls from '../components/Controls.jsx'
import Results from '../components/Results.jsx'
import Notifications from '../components/Notifications.jsx'
import {wsURL} from '../utils/api'
import {isValid} from '../utils/'

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

    componentDidUpdate() {
        if (this.state.notification.state) {
            setTimeout(() => this.handleNotification(false, '', ''), 5000)
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

        isValid(firstHashtag) && isValid(secondHashtag)
            ? this.handleRequest(firstHashtag, secondHashtag)
            : this.handleNotification(true, 'Error', 'Invalid hashtags')
    }

    handleRequest(first, second) {
        const ws = new WebSocket(wsURL)

        const heartbeat = setInterval(() => {
            /**
             * If close request is emitted, close on next message event
             */
            if (this.state.isCloseEmitted) ws.close()
        }, 500)

        ws.onopen = (event) => {
            ws.send(JSON.stringify({tags: [first, second]}))
            this.setState({
                socketConnection: true
            })
            this.handleNotification(
                true,
                'Notification',
                'Connection established, waiting for tweets.'
            )
        }

        ws.onmessage = (event) => {
            const parsed = JSON.parse(event.data)
            this.setState({
                firstHashtagValue: parsed[this.state.firstHashtag],
                secondHashtagValue: parsed[this.state.secondHashtag]
            })
        }

        ws.onclose = (event) => {
            this.setState({
                socketConnection: false,
                isCloseEmitted: false
            })
            switch (event.code) {
            case 1000:
                this.handleNotification(true, 'Error', 'Connection closed.')
                break
            case 1001:
                this.handleNotification(
                    true,
                    'Error',
                    'Rate exceeded, please wait several seconds before trying again.'
                )
                break
            default:
                this.handleNotification(
                    true,
                    'Error',
                    'Could not establish connection, try again later'
                )
            }
            clearInterval(heartbeat)
        }
    }

    emitCloseRequest() {
        this.setState({
            isCloseEmitted: true
        })
    }

    handleNotification(state, title, message) {
        this.setState({
            notification: {
                state,
                title,
                message
            }
        })
    }

    render() {
        const {
            firstHashtagValue,
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
                    handleNotification={(state, title, message) =>
                        this.handleNotification(state, title, message)}
                />
            </div>
        )
    }
}
