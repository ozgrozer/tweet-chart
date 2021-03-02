import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Form, Input, Select } from 'rfv'

import './../css/style.scss'

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
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
