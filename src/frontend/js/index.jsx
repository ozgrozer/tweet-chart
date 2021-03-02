import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Form, Input, Select } from 'rfv'
import { Line } from '@reactchartjs/react-chart.js'

import './../css/style.scss'

const LineChart = () => {
  const btc = {
    labels: ['Jan 1 2021', 'Jan 2 2021', 'Jan 3 2021', 'Jan 4 2021', 'Jan 5 2021', 'Jan 6 2021', 'Jan 7 2021', 'Jan 8 2021', 'Jan 9 2021', 'Jan 10 2021', 'Jan 11 2021', 'Jan 12 2021', 'Jan 13 2021', 'Jan 14 2021', 'Jan 15 2021', 'Jan 16 2021', 'Jan 17 2021', 'Jan 18 2021', 'Jan 19 2021', 'Jan 20 2021', 'Jan 21 2021', 'Jan 22 2021', 'Jan 23 2021', 'Jan 24 2021', 'Jan 25 2021', 'Jan 26 2021', 'Jan 27 2021', 'Jan 28 2021', 'Jan 29 2021', 'Jan 30 2021', 'Jan 31 2021'],
    data: ['29380.86', '32174.21', '33047.33', '32060.62', '34030.85', '36761.82', '39638.67', '40868.37', '40358.75', '38338.40', '35687.10', '34512.57', '37165.51', '39122.75', '36877.52', '36061.34', '35836.69', '36593.99', '35982.88', '35538.56', '31060.53', '32890.20', '32115.08', '32279.40', '32337.20', '32498.71', '30491.49', '33404.37', '34218.52', '34180.87', '33063.63']
  }

  const data = {
    labels: btc.labels,
    datasets: [
      {
        fill: false,
        label: 'BTC',
        data: btc.data,
        pointRadius: 0,
        borderColor: '#4b64ce'
      }
    ]
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false
          }
        }
      ]
    }
  }

  return (
    <Line data={data} options={options} />
  )
}

const validations = {
  empty: [
    {
      rule: 'isLength',
      args: { min: 1 },
      invalidFeedback: 'Please provide a value'
    }
  ]
}

const App = () => {
  const [backendResult, setBackendResult] = useState('')

  const [formIsSubmitting, setFormIsSubmitting] = useState(false)
  const onSubmit = res => {
    if (res.isFormValid) {
      setBackendResult('')
      setFormIsSubmitting(true)
    }
  }
  const postSubmit = res => {
    setFormIsSubmitting(false)
    setBackendResult(res.data)
  }

  return (
    <div id='app'>
      <h1>Tweet Chart</h1>

      <Form
        onSubmit={onSubmit}
        postSubmit={postSubmit}
        postOptions={{ method: 'post', url: '/generate-images' }}
      >
        <fieldset disabled={formIsSubmitting}>
          <div className='formGroup'>
            <label htmlFor='tweetUrl'>
              Tweet URL
            </label>
            <Input
              type='url'
              id='tweetUrl'
              name='tweetUrl'
              validations={validations.empty}
              placeholder='https://twitter.com/elonmusk/status/1366477626429169666'
            />
          </div>

          <div className='formGroup'>
            <label htmlFor='cryptocurrency'>
              Cryptocurrency
            </label>
            <Select
              value='BTC'
              id='cryptocurrency'
              name='cryptocurrency'
            >
              <option value='BTC'>Bitcoin</option>
              <option value='ETH'>Ethereum</option>
              <option value='ADA'>Cardano</option>
              <option value='BNB'>Binance Coin</option>
              <option value='USDT'>Tether</option>
              <option value='DOT'>Polkadot</option>
              <option value='XRP'>XRP</option>
              <option value='LTC'>Litecoin</option>
              <option value='LINK'>Chainlink</option>
              <option value='XLM'>Stellar</option>
            </Select>
          </div>

          <div className='formGroup'>
            <button>Submit</button>
          </div>
        </fieldset>
      </Form>

      <div className='generatedImageWrapper'>
        {
          backendResult
            ? (
              <div>
                <img
                  className='generatedImage'
                  src={`data:image/png;base64,${backendResult}`}
                />
              </div>
              )
            : (
              <div className='helpText'>
                {
                  formIsSubmitting
                    ? (<div>Loading...</div>)
                    : (<div>Type the tweet URL in the input above</div>)
                }
              </div>
              )
        }
      </div>

      <div style={{ marginTop: '30px' }}>
        <LineChart />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
