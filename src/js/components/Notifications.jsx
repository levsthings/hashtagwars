import React, {Component} from 'react'

export default class Notifications extends Component {
    render() {
        return (
            <div className='htw-notification'>
                <article className='message is-warning is-small'>
                    <div className='message-header'>
                        <p className='htw-notification-header'>Notification</p>
                        <button className='delete is-small' aria-label='delete' />
                    </div>
                    <div className='message-body'>
                        <p>Incoming data...</p>
                    </div>
                </article>
            </div>

        )
    }
}
