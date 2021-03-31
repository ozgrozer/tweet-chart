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

const LineToChart = props => {
  const { tweetImageRef, pointCoordinates } = props

  if (tweetImageRef) {
    const imageZoom = 1
    const tweetZoom = 0.9

    const actualTweetWidthMiddleFromLeft = tweetImageRef.offsetLeft + (tweetImageRef.offsetWidth / 2)
    const adjustedTweetWidthMiddleFromLeft = (actualTweetWidthMiddleFromLeft * tweetZoom) / imageZoom

    const actualTweetHeightFromTop = tweetImageRef.offsetTop + tweetImageRef.offsetHeight
    const adjustedTweetHeightFromTop = (actualTweetHeightFromTop * tweetZoom) / imageZoom

    const point1 = {
      x: adjustedTweetWidthMiddleFromLeft,
      y: adjustedTweetHeightFromTop
    }
    const point2 = {
      x: pointCoordinates.x + 5,
      y: pointCoordinates.y + 5
    }

    const a = point1.x - point2.x
    const b = point1.y - point2.y
    const lineWidth = Math.sqrt(a * a + b * b) - 5
    const angleDegree = Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI

    const style = {
      left: `${point1.x}px`,
      top: `${point1.y}px`,
      width: `${lineWidth}px`,
      transform: `rotate(${angleDegree}deg)`
    }

    return (
      <div className='lineToChart' style={style} />
    )
  } else {
    return null
  }
}

const GeneratedImage = props => {
  const { backendResult } = props
  const { tweetDetails, coinHistoricalData, coinSymbol } = backendResult

  const tweetDate = time({ normalTime: tweetDetails.data[0].created_at, format: 'yyyy-MM-dd' })
  const tweetDateIndex = findDataIndex({ data: coinHistoricalData, tweetDate })

  const [pointCoordinates, setPointCoordinates] = useState({})
  const [tweetImageRef, setTweetImageRef] = useState(null)

  return (
    <div id='generatedImage' className='generatedImage'>
      <TweetImage
        tweetDetails={tweetDetails}
        setTweetImageRef={setTweetImageRef}
      />
      <LineChart
        coinSymbol={coinSymbol}
        tweetDateIndex={tweetDateIndex}
        pointCoordinates={pointCoordinates}
        coinHistoricalData={coinHistoricalData}
        setPointCoordinates={setPointCoordinates}
      />
      <Watermark />
      <LineToChart
        tweetImageRef={tweetImageRef}
        pointCoordinates={pointCoordinates}
      />
    </div>
  )
}

export default GeneratedImage
