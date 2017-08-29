import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App.jsx'

require('../templates/app.pug')
require('../styles/app.sass')

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
