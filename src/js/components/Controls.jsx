import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
// import Fight from '../../img/fight.svg'

export default class Controls extends PureComponent {
    static propTypes = {
        handleInput: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        emitCloseRequest: PropTypes.func.isRequired,
        socketConnection: PropTypes.bool.isRequired
    }

    renderButtonText() {
        return (!this.props.socketConnection)
            ? 'Fight'
            : 'Stop'
    }

    handleButtonRole() {
        return (!this.props.socketConnection)
            ? this.props.handleSubmit()
            : this.props.emitCloseRequest()
    }

    render() {
        return (
            <div className='htw-scene-controls'>
                <div className='columns'>
                    <div className='column is-3 is-offset-3 is-10-mobile is-offset-1-mobile has-text-centered'>
                        <h4>First Hashtag</h4>
                        <input
                            name='firstHashtag'
                            className='htw-controls input is-medium' type='text' placeholder='#hashtag'
                            onInput={event => this.props.handleInput(event)}
                        />
                    </div>
                    <div className='column is-3 is-10-mobile is-offset-1-mobile has-text-centered'>
                        <h4>Second Hashtag</h4>
                        <input
                            name='secondHashtag'
                            className='htw-controls input is-medium' type='text' placeholder='#hashtag'
                            onInput={event => this.props.handleInput(event)}
                        />
                    </div>
                </div>
                <div className='has-text-centered'>
                    <button
                        className={`htw-controls-button button is-medium`}
                        onClick={event => this.handleButtonRole()}
                    >
                        {this.renderButtonText()}
                    </button>
                </div>
            </div>
        )
    }
}
