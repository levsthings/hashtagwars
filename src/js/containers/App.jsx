import React, {Component} from 'react'
import Header from './Header.jsx'
import Controls from './Controls.jsx'
import Results from './Results.jsx'

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className='main-screen'>
                    <Controls />
                    <Results />
                </div>
            </div>
        )
    }
}
