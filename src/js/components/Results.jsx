import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {HorizontalBar} from 'react-chartjs-2'

export default class Results extends Component {
    static propTypes = {
        firstHashtagValue: PropTypes.number.isRequired,
        secondHashtagValue: PropTypes.number.isRequired,
        firstHashtag: PropTypes.string,
        secondHashtag: PropTypes.string
    }
    render() {
        const data = (canvas) => {
            const ctx = canvas.getContext("2d")
            
            const gradient = ctx.createLinearGradient(0, 0, 400, 0)
            gradient.addColorStop(0, 'rgb(69,104,220)')
            gradient.addColorStop(1, 'rgb(176,106,179)')

            const gradientTwo = ctx.createLinearGradient(0, 0, 400, 0)
            gradientTwo.addColorStop(0, 'rgb(252,0,255)')
            gradientTwo.addColorStop(1, 'rgb(0,219,222)')
            

            return {
                labels: [this.props.firstHashtag, this.props.secondHashtag],
                datasets: [{
                    label: 'dataset',
                    data: [this.props.firstHashtagValue, this.props.secondHashtagValue],
                    backgroundColor: [gradient, gradientTwo]
                }]
            }
        }
        const options = {
            title: {
                display: true,
                text: 'hashtags'
            },
            maintainAspectRatio: true
        }
        return (
            <div className='columns'>
                <div className='column is-6 is-offset-3 has-text-centered'>
                    <HorizontalBar 
                        height={100}
                        data={data}
                        options={options}
                     />
                </div>
            </div>
        )
    }
}
