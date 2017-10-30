import React, {PureComponent} from 'react'
import Header from '../components/Header.jsx'
import Game from './Game.jsx'
import fetch from 'isomorphic-fetch'
import {apiURL} from '../utils/api'

export default class App extends PureComponent {
    componentDidMount() {
        fetch(apiURL).catch(() => console.log('Waking server up...'))
    }
    render() {
        return (
            <div className='htw-app'>
                <Header />
                <Game />
            </div>
        )
    }
}
