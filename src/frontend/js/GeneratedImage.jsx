import React, { useEffect, useState } from 'react'

import LineChart from './LineChart'
import TweetImage from './TweetImage'
import time from './../../common/time'

const findDataIndex = props => {
  const { data, tweetDate } = props
  let result
  for (const key in data) {
    const coin = data[key]
    const coinDate = time({ normalTime: coin.timestamp, format: 'yyyy-MM-dd' })
    if (coinDate === tweetDate) result = parseInt(key)
  }
  return result
}

const Watermark = () => {
  return (
    <div className='watermark'>
      <div>https://tweetch.art</div>
    </div>
  )
}

const getCoordinates = el => {
  const tweetSelector = document.getElementsByClassName('tweetImage')[0]

  const imageZoom = 2
  const tweetZoom = 0.9

  const actualTweetWidthMiddleFromLeft = tweetSelector.offsetLeft + (tweetSelector.offsetWidth / 2)
  const adjustedTweetWidthMiddleFromLeft = (actualTweetWidthMiddleFromLeft * tweetZoom) / imageZoom

  const actualTweetHeightFromTop = tweetSelector.offsetTop + tweetSelector.offsetHeight
  const adjustedTweetHeightFromTop = (actualTweetHeightFromTop * tweetZoom) / imageZoom

  const top = adjustedTweetHeightFromTop
  const left = adjustedTweetWidthMiddleFromLeft

  return {
    top,
    left
  }
}

const LineToChart = () => {
  const [coordinates, setCoordinates] = useState({})
  useEffect(() => {
    setCoordinates(getCoordinates())
  }, [])

  return (
    <div
      className='lineToChart'
      style={{
        top: `${coordinates.top}px`,
        left: `${coordinates.left}px`
      }}
    />
  )
}

const GeneratedImage = props => {
  const { backendResult } = props
  const { tweetDetails, coinHistoricalData, coinSymbol } = backendResult

  const tweetDate = time({ normalTime: tweetDetails.data[0].created_at, format: 'yyyy-MM-dd' })
  const tweetDateIndex = findDataIndex({ data: coinHistoricalData, tweetDate })

  return (
    <div id='generatedImage' className='generatedImage'>
      <TweetImage tweetDetails={tweetDetails} />
      <LineChart coinHistoricalData={coinHistoricalData} coinSymbol={coinSymbol} tweetDateIndex={tweetDateIndex} />
      <Watermark />
      <LineToChart />
    </div>
  )
}

export default GeneratedImage
