import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {HorizontalBar} from 'react-chartjs-2'

export default class Results extends PureComponent {
    static propTypes = {
        firstHashtagValue: PropTypes.number.isRequired,
        secondHashtagValue: PropTypes.number.isRequired,
        firstHashtag: PropTypes.string,
        secondHashtag: PropTypes.string
    }

    render() {
        const data = (canvas) => {
            const ctx = canvas.getContext('2d')

            const gradient = ctx.createLinearGradient(0, 0, 800, 0)
            gradient.addColorStop(0, 'rgb(84,158,255)')
            gradient.addColorStop(1, 'rgb(145,84,255)')

            const gradientTwo = ctx.createLinearGradient(0, 0, 800, 0)
            gradientTwo.addColorStop(0, 'rgb(211,131,18)')
            gradientTwo.addColorStop(1, 'rgb(168,50,121)')

            return {
                labels: [this.props.firstHashtag, this.props.secondHashtag],
                datasets: [
                    {
                        label: 'mentions',
                        data: [
                            this.props.firstHashtagValue,
                            this.props.secondHashtagValue
                        ],
                        backgroundColor: [gradient, gradientTwo],
                        hoverBackgroundColor: [
                            'rgba(145,84,255, 0.6)',
                            'rgba(168,50,121, 0.6)'
                        ]
                    }
                ]
            }
        }
        const options = {
            legend: {
                display: false
            },
            drawBorder: true,
            scales: {
                xAxes: [
                    {
                        ticks: {
                            fontSize: 9,
                            stepSize: 1,
                            fontFamily: 'Lato',
                            fontColor: '#8690a6',
                            beginAtZero: true
                        }
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            fontSize: 14,
                            fontFamily: 'Lato',
                            fontColor: '#8690a6'
                        }
                    }
                ]
            },
            maintainAspectRatio: false
        }
        return (
            <div className='htw-scene-results columns'>
                <div className='column is-10 is-offset-1 is-10-mobile is-offset-1-mobile has-text-centered'>
                    <HorizontalBar height={400} data={data} options={options} />
                </div>
            </div>
        )
    }
}
