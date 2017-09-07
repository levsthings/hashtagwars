import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Notifications extends Component {
    static propTypes = {
        notification: PropTypes.shape({
            state: PropTypes.bool.isRequired,
            title: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired
        }),
        handleNotification: PropTypes.func.isRequired
    }
    render() {
        const {state, title, message} = this.props.notification
        if (state) {
            return (
                <div className='columns'>
                    <div className='htw-notification column is-3-desktop is-6'>
                        <article className='message is-warning is-small'>
                            <div className='message-header'>
                                <p className='htw-notification-header'>{title}</p>
                                <button
                                    className='delete is-small' aria-label='delete'
                                    onClick={() => this.props.handleNotification(false, '', '')}
                                />
                            </div>
                            <div className='message-body'>
                                <p>{message}</p>
                            </div>
                        </article>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
}
