import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Form, Input, Select } from 'rfv'
import { Line } from '@reactchartjs/react-chart.js'

import './../css/style.scss'

import time from './../../common/time'

const demoTweetDetails = {
  data: [{
    author_id: '44196397',
    public_metrics: {
      retweet_count: 6078,
      reply_count: 6170,
      like_count: 88140,
      quote_count: 731
    },
    created_at: '2021-03-03T20:10:07.000Z',
    text: '5 mins to Starship test flight attempt',
    id: '1367205667321171968',
    source: 'Twitter for iPhone'
  }],
  includes: {
    users: [{
      username: 'elonmusk',
      created_at: '2009-06-02T20:12:29.000Z',
      id: '44196397',
      profile_image_url: 'https://pbs.twimg.com/profile_images/1364491704817098753/V22-Luf7_normal.jpg',
      name: 'Elon Musk'
    }]
  }
}

const kFormatter = num => {
  return Math.abs(num) > 999
    ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K'
    : Math.sign(num) * Math.abs(num)
}

const TweetImage = props => {
  const { tweetDetails } = props

  const tweetData = tweetDetails.data[0]
  const tweetUser = tweetDetails.includes.users[0]

  return (
    <div className='tweetImage'>
      <svg viewBox='0 0 24 24' className='twitterLogo'>
        <g>
          <path d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z' />
        </g>
      </svg>

      <div className='userDetails'>
        <div className='profileImageWrapper'>
          <img
            alt=''
            className='profileImage'
            src={tweetUser.profile_image_url}
          />
        </div>

        <div className='nameAndUsernameWrapper'>
          <div className='name'>
            {tweetUser.name}
          </div>

          <div className='username'>
            @{tweetUser.username}
          </div>
        </div>
      </div>

      <div className='text'>
        {tweetData.text}
      </div>

      <div className='createdAt'>
        {time({ normalTime: tweetData.created_at, format: 'h:mm TT · MMM d, yyyy' })}
        {tweetData.source ? <span> · {tweetData.source}</span> : null}
      </div>

      <div className='metrics'>
        <div className='metric'>
          <svg viewBox='0 0 24 24' className='metricIcon'>
            <g>
              <path d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z' />
            </g>
          </svg>
          <div className='metricCount'>
            {kFormatter(tweetData.public_metrics.like_count)}
          </div>
        </div>

        <div className='metric'>
          <svg viewBox='0 0 24 24' className='metricIcon'>
            <g>
              <path d='M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z' />
            </g>
          </svg>
          <div className='metricCount'>
            {kFormatter(tweetData.public_metrics.reply_count)}
          </div>
        </div>
      </div>
    </div>
  )
}

const LineChart = props => {
  const { coinHistoricalData } = props

  const btc = {
    labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19', 'Jan 20', 'Jan 21', 'Jan 22', 'Jan 23', 'Jan 24', 'Jan 25', 'Jan 26', 'Jan 27', 'Jan 28', 'Jan 29', 'Jan 30', 'Jan 31'],
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
    <div className='lineChart'>
      <Line
        data={data}
        width={958}
        height={458}
        options={options}
      />
    </div>
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

const GeneratedImage = props => {
  const { backendResult } = props
  const { tweetDetails, coinHistoricalData } = backendResult

  return (
    <div className='generatedImage'>
      <TweetImage tweetDetails={tweetDetails} />
      <LineChart coinHistoricalData={coinHistoricalData} />
    </div>
  )
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
              <GeneratedImage backendResult={backendResult} />
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

      <div className='generatedImageWrapper' style={{ marginTop: '30px', marginBottom: '30px' }}>
        <GeneratedImage backendResult={{ tweetDetails: demoTweetDetails }} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
