import React, {Component} from 'react'

export default class Controls extends Component {
    render() {
        return (
            <div className='columns'>
                <div className='column is-3 is-offset-3 has-text-centered'>
                    <h4>First Hashtag</h4>
                    <div className='control'>
                        <input className='input is-medium' type='text' placeholder='#hashtag' />
                    </div>
                </div>
                <div className='column is-3 has-text-centered'>
                    <h4>Second Hashtag</h4>
                    <div className='control'>
                        <input className='input is-medium' type='text' placeholder='#hashtag' />
                    </div>
                </div>
            </div>
        )
    }
}
