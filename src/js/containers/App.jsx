import React, {Component} from 'react'
import Header from '../components/Header.jsx'
import Game from './Game.jsx'

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Game />
            </div>
        )
    }
}
