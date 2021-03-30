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

const getCoordinates = props => {
  const { pointCoordinates } = props
  console.log(pointCoordinates)

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

const LineToChart = props => {
  const { pointCoordinates } = props

  const [coordinates, setCoordinates] = useState({})
  useEffect(() => {
    if (Object.keys(pointCoordinates).length) {
      setCoordinates(getCoordinates({ pointCoordinates }))
    }
  }, [pointCoordinates])

  if (Object.keys(coordinates).length) {
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

  return null
}

const GeneratedImage = props => {
  const { backendResult } = props
  const { tweetDetails, coinHistoricalData, coinSymbol } = backendResult

  const tweetDate = time({ normalTime: tweetDetails.data[0].created_at, format: 'yyyy-MM-dd' })
  const tweetDateIndex = findDataIndex({ data: coinHistoricalData, tweetDate })

  const [pointCoordinates, setPointCoordinates] = useState({})

  const left = pointCoordinates.x / 2
  const top = pointCoordinates.y / 2

  return (
    <div id='generatedImage' className='generatedImage'>
      <TweetImage tweetDetails={tweetDetails} />
      <LineChart
        coinSymbol={coinSymbol}
        tweetDateIndex={tweetDateIndex}
        pointCoordinates={pointCoordinates}
        coinHistoricalData={coinHistoricalData}
        setPointCoordinates={setPointCoordinates}
      />
      <Watermark />
      <LineToChart pointCoordinates={pointCoordinates} />
      <div style={{ position: 'absolute', left: `${left}px`, top: `${top}px`, width: '10px', height: '10px', backgroundColor: 'red', zIndex: '3', zoom: '2' }} />
    </div>
  )
}

export default GeneratedImage
