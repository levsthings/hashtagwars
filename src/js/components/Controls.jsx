import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import Fight from '../../img/fight.svg'

export default class Controls extends Component {
    static propTypes = {
        handleInput: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired
    }

    render() {
        return (
            <div>
                <div className='columns'>
                    <div className='column is-3 is-offset-3 has-text-centered'>
                        <h4>First Hashtag</h4>
                        <input
                            name="firstHashtag"
                            className='input is-medium' type='text' placeholder='#hashtag'
                            onInput={event => this.props.handleInput(event)}
                        />
                    </div>
                    <div className='column is-3 has-text-centered'>
                        <h4>Second Hashtag</h4>
                        <input
                            name="secondHashtag"
                            className='input is-medium' type='text' placeholder='#hashtag'
                            onInput={event => this.props.handleInput(event)}
                        />
                    </div>
                </div>
                <div className='has-text-centered'>
                    <button
                        className={`htw-controls-button button is-medium`}
                        onClick={event => this.props.handleSubmit()}
                    >
                        Fight!
                    </button>
                </div>
            </div>
        )
    }
}
