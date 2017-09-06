import React, {PureComponent} from 'react'
import Header from '../components/Header.jsx'
import Game from './Game.jsx'

export default class App extends PureComponent {
    render() {
        return (
            <div className='htw-app'>
                <Header />
                <Game />
            </div>
        )
    }
}
