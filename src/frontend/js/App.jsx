/* eslint react/jsx-fragments: 0 */

import ReactDOM from 'react-dom'
import { Form, Input } from 'rfv'
import domtoimage from 'dom-to-image'
import React, { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'

import './../css/style.scss'

import demoData from './demoData'
import GeneratedImage from './GeneratedImage'
import currencies from './../../common/currencies'
import faviconJpg from './../img/favicon/favicon.jpg'

const testing = false

const validations = {
  tweetUrl: [
    {
      rule: 'isLength',
      args: { min: 1 },
      invalidFeedback: 'Please provide a Tweet URL'
    },
    {
      rule: 'matches',
      invalidFeedback: 'Please provide a valid Tweet URL',
      args: /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/
    }
  ]
}

const DownloadButton = () => {
  const downloadImage = () => {
    domtoimage.toPng(document.getElementById('generatedImage'))
      .then(dataUrl => {
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = 'tweet-chart.png'
        a.click()
      })
  }

  return (
    <button className='button blue downloadButton' onClick={downloadImage}>
      Download
    </button>
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

  const [width, setWidth] = useState(window.innerWidth)
  const isMobile = width <= 768
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  useEffect(() => {
    const zoom = 2
    const tweetImageWidth = 1440
    const mobilePaddings = 30 * 2
    const usableWidth = width - mobilePaddings
    const mobileZoom = usableWidth / tweetImageWidth
    const divs = document.getElementsByClassName('generatedImageWrapper')
    for (let i = 0; i < divs.length; i++) {
      const div = divs[i]
      div.style.zoom = isMobile ? mobileZoom : 1 / zoom
    }
  }, [width])

  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const currencyOnChange = selection => setSelectedCurrency(selection)

  return (
    <div id='app'>
      <h1 id='appTitle'>
        <img src={faviconJpg} alt='' />
        Tweet Chart
      </h1>
      <p id='appDescription'>This simple website lets you create a TweetChart. It’s a tweet superimposed onto a cryptocurrency price chart. Useful to show how poor (or great) in hindsight someone’s tweet was!</p>

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
              validations={validations.tweetUrl}
              placeholder='https://twitter.com/elonmusk/status/1366477626429169666'
            />
          </div>

          <div className='formGroup'>
            <label htmlFor='coinSymbol'>
              Cryptocurrency
            </label>
            <CreatableSelect
              inputId='coinSymbol'
              placeholder='Select'
              options={currencies}
              className='reactSelect'
              value={selectedCurrency}
              onChange={currencyOnChange}
              classNamePrefix='reactSelect'
              formatCreateLabel={inputValue => `Currency Symbol: ${inputValue}`}
            />
            <Input
              type='hidden'
              name='coinSymbol'
              value={selectedCurrency.value}
            />
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
                    ? (<React.Fragment>Loading...</React.Fragment>)
                    : (<React.Fragment>Type the tweet URL in the input above</React.Fragment>)
                }
              </div>
              )
        }
      </div>

      {
        testing
          ? (
            <div className='generatedImageWrapper'>
              <GeneratedImage
                backendResult={{
                  coinSymbol: 'BTC',
                  tweetDetails: demoData.tweet,
                  coinHistoricalData: demoData.coin
                }}
              />
            </div>
            )
          : null
      }

      {
        backendResult
          ? (<DownloadButton />)
          : null
      }

      <footer>
        <div>Created by <a href='https://litecoin-foundation.org/' target='_blank' rel='noopener noreferrer'>Litecoin Foundation</a></div>
        <div>Designed by <a href='https://twitter.com/ozgrozer' target='_blank' rel='noopener noreferrer'>@ozgrozer</a></div>
        <div>Crypto market cap & pricing data provided by <a href='https://nomics.com/' target='_blank' rel='noopener noreferrer'>Nomics</a></div>

        <div className='mt'>
          <a href='https://twitter.com/tweet_chart' className='twitter' target='_blank' rel='noopener noreferrer'>
            <i className='icon icon-twitter' />
            <span>Twitter</span>
          </a>
        </div>

        <div>
          <a href='https://github.com/ozgrozer/tweet-chart/issues' className='github' target='_blank' rel='noopener noreferrer'>
            <i className='icon icon-github' />
            <span>Feedback</span>
          </a>
        </div>
      </footer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
