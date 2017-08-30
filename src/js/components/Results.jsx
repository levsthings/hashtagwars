import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Results extends Component {
    static propTypes = {
        firstHashtag: PropTypes.number.isRequired,
        secondHashtag: PropTypes.number.isRequired
    }
    render() {
        return (
            <div className='columns'>
                <div className='column is-3 is-offset-3 has-text-centered'>
                    <h4>{this.props.firstHashtag}</h4>
                </div>
                <div className='column is-3 has-text-centered'>
                    <h4>{this.props.secondHashtag}</h4>
                </div>
            </div>
        )
    }
}
