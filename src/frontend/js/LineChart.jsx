import React from 'react'
import { Line } from '@reactchartjs/react-chart.js'

import maxValue from './../../common/maxValue'
import currencies from './../../common/currencies'
import numberFormat from './../../common/numberFormat'

const LineChart = props => {
  const { coinHistoricalData, coinSymbol, tweetDateIndex, pointCoordinates, setPointCoordinates } = props

  const labels = []
  const datasets = []
  for (const key in coinHistoricalData) {
    const coinDetails = coinHistoricalData[key]
    const coinDate = coinDetails.timestamp.substr(0, 10)
    const dataset = parseFloat(coinDetails.rate)
    labels.push(coinDate)
    datasets.push(dataset)
  }

  const customRadius = context => {
    const index = context.dataIndex
    if (index === tweetDateIndex) {
      const _meta = context.dataset._meta
      const _view = _meta[Object.keys(_meta)[0]].data[index]._view
      if (_view && !Object.keys(pointCoordinates).length) {
        setPointCoordinates({ x: _view.x + 10, y: _view.y + 10 })
      }
    }
    return index === tweetDateIndex ? 10 : 0
  }

  const _maxYAxis = (maxValue(datasets) * 1.8).toFixed(0)
  const valueLength = _maxYAxis.toString().length
  const multiplyValue = 10 ** (valueLength - 1)
  const round = Math.round(_maxYAxis / multiplyValue) * multiplyValue
  const maxYAxis = round < 1 ? (maxValue(datasets) * 3.6) : round

  let coinLabel
  for (const key in currencies) {
    const currency = currencies[key]
    if (currency.value === coinSymbol) {
      coinLabel = currency.label
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        fill: true,
        data: datasets,
        showLine: true,
        label: coinLabel,
        pointBorderWidth: '2',
        borderColor: '#4b64ce',
        pointBorderColor: '#000000',
        pointBackgroundColor: '#1da1f2',
        backgroundColor: 'rgba(75, 99, 206, 0.1)'
      }
    ]
  }

  const options = {
    animation: {
      duration: 0
    },
    legend: {
      display: true,
      labels: {
        fontSize: 20
      }
    },
    elements: {
      point: {
        radius: customRadius
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontSize: 20,
          autoSkip: true,
          maxTicksLimit: 20
        }
      }],
      yAxes: [{
        ticks: {
          fontSize: 20,
          max: maxYAxis,
          autoSkip: true,
          minTicksLimit: 10,
          beginAtZero: false,
          callback: (label, index, labels) => {
            return `$${numberFormat(label, 0, '.', ',')}`
          }
        }
      }]
    }
  }

  const padding = 20
  const borderWidth = 1
  const width = 1440 - (padding * 2) - (borderWidth * 2)
  const height = 810 - (padding * 2) - (borderWidth * 2)

  return (
    <div className='lineChart'>
      <Line
        data={data}
        width={width}
        height={height}
        options={options}
      />
    </div>
  )
}

export default LineChart
