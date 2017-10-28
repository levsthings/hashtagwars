import React, {Component} from 'react'
import Controls from '../components/Controls.jsx'
import Results from '../components/Results.jsx'
import Notifications from '../components/Notifications.jsx'
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
        const ws = new WebSocket('wss://hashtagwars-api.herokuapp.com')

        ws.onopen = () => {
            ws.send(JSON.stringify({tags: [first, second]}))
            this.setState({
                socketConnection: true
            })
            this.handleNotification(
                true,
                'Notification',
                'Connection established'
            )
        }

        ws.onmessage = (e) => {
            const parsed = JSON.parse(e.data)
            this.setState({
                firstHashtagValue: parsed[this.state.firstHashtag],
                secondHashtagValue: parsed[this.state.secondHashtag]
            })
            /**
             * If close request is emitted, close on next message event
             */
            if (this.state.isCloseEmitted) ws.close()
        }

        ws.onclose = (error) => {
            this.setState({
                socketConnection: false,
                isCloseEmitted: false
            })

            error
                ? this.handleNotification(
                    true,
                    'Error',
                    'Could not establish connection, try again later'
                )
                : this.handleNotification(
                    true,
                    'Notification',
                    'Connection closed.'
                )
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
