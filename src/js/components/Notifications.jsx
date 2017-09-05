import React, {Component} from 'react'

export default class Notifications extends Component {
    render() {
        return (
            <div className='columns'>
                <div className='column is-6 is-offset-3'>
                    <article className='message is-warning is-small'>
                        <div className='message-header'>
                            <p>Notification</p>
                            <button className='delete is-small' aria-label='delete' />
                        </div>
                        <div className='message-body'>
                            Display some messages here..
                        </div>
                    </article>
                </div>
            </div>
        )
    }
}
