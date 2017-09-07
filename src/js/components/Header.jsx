import React, {PureComponent} from 'react'

export default class Header extends PureComponent {
    render() {
        return (
            <div>
                <div className='htw-header has-text-centered'>
                    <h1 className='htw-app-title'>#hashtagwars</h1>
                </div>
            </div>
        )
    }
}
