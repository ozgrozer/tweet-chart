/* eslint react/jsx-fragments: 0 */

import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import domtoimage from 'dom-to-image'
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
const demoCoinHistoricalData = [
  { timestamp: '2021-01-05T00:00:00Z', rate: '34030.85984153742225335763534799823670371107574179901789087' },
  { timestamp: '2021-01-06T00:00:00Z', rate: '36761.82497929663392934721800097502662628201144681521181629' },
  { timestamp: '2021-01-07T00:00:00Z', rate: '39638.67508007077935071400412837643575033166345169654213735' },
  { timestamp: '2021-01-08T00:00:00Z', rate: '40868.37675878416142131026239061682859433544949802078065084' },
  { timestamp: '2021-01-09T00:00:00Z', rate: '40358.75375562452018029662303649202138843398304298359025905' },
  { timestamp: '2021-01-10T00:00:00Z', rate: '38338.40151227169691214023003344803396089095780744480771415' },
  { timestamp: '2021-01-11T00:00:00Z', rate: '35687.10413721746977674684816031715631725666395223756200733' },
  { timestamp: '2021-01-12T00:00:00Z', rate: '34512.57982622618175668222722773043493585237300896890483995' },
  { timestamp: '2021-01-13T00:00:00Z', rate: '37165.51464174185418815494400017611262683838627842518089279' },
  { timestamp: '2021-01-14T00:00:00Z', rate: '39122.75490769262097160801190850148278564782341602900574965' },
  { timestamp: '2021-01-15T00:00:00Z', rate: '36877.52372845383351568290387865583083871163115615958069223' },
  { timestamp: '2021-01-16T00:00:00Z', rate: '36061.3406351877230289186935492791501556942563779864687964' },
  { timestamp: '2021-01-17T00:00:00Z', rate: '35836.6962840694704889107930576069004768650976793670268567' },
  { timestamp: '2021-01-18T00:00:00Z', rate: '36593.99033931482729524750353095239138628305360827907097698' },
  { timestamp: '2021-01-19T00:00:00Z', rate: '35982.88300840665740418931144824881273783973694027875232945' },
  { timestamp: '2021-01-20T00:00:00Z', rate: '35538.56619255177130760835611410183914160515912385648771252' },
  { timestamp: '2021-01-21T00:00:00Z', rate: '31060.53827960366008020423913624236246633213636041678830774' },
  { timestamp: '2021-01-22T00:00:00Z', rate: '32890.20376505791049791035138442718481904863055359054357480' },
  { timestamp: '2021-01-23T00:00:00Z', rate: '32115.08969010823942078267791632614400626294398459214190833' },
  { timestamp: '2021-01-24T00:00:00Z', rate: '32279.40684953432701511514254294624052551575821227934184591' },
  { timestamp: '2021-01-25T00:00:00Z', rate: '32337.20728299666356304551206364424621526103618307168368029' },
  { timestamp: '2021-01-26T00:00:00Z', rate: '32498.71897818900128086812819810524529029593934074788328737' },
  { timestamp: '2021-01-27T00:00:00Z', rate: '30491.49686054878666126382050821516261147490031220710984926' },
  { timestamp: '2021-01-28T00:00:00Z', rate: '33404.39310631559927679026500766532150874913265301333996642' },
  { timestamp: '2021-01-29T00:00:00Z', rate: '34218.52131374850014359262750697839489386399439110639064168' },
  { timestamp: '2021-01-30T00:00:00Z', rate: '34180.86769747682912377983505855432481985069987595590066585' },
  { timestamp: '2021-01-31T00:00:00Z', rate: '33063.63302122413269651280631645448909495726400527552388989' },
  { timestamp: '2021-02-01T00:00:00Z', rate: '33457.89026927013703194478623989995112462535268010019741259' },
  { timestamp: '2021-02-02T00:00:00Z', rate: '35407.17491507935055328965468208405158008842469133248308855' },
  { timestamp: '2021-02-03T00:00:00Z', rate: '37387.13326862310661704575010807417548307948489780663582924' },
  { timestamp: '2021-02-04T00:00:00Z', rate: '36929.07295473809012391109357012371291670230111548721608932' },
  { timestamp: '2021-02-05T00:00:00Z', rate: '37858.28748248221146386813221582299822077137929789415323131' },
  { timestamp: '2021-02-06T00:00:00Z', rate: '39114.72167292214273656364827034079084793801558239661428409' },
  { timestamp: '2021-02-07T00:00:00Z', rate: '38710.10168762896262805680353391888264623073806151186666023' },
  { timestamp: '2021-02-08T00:00:00Z', rate: '46166.22597382811089754447245044571035835410624504614624324' },
  { timestamp: '2021-02-09T00:00:00Z', rate: '46149.47857788207570553684456047379604263333291640314486004' },
  { timestamp: '2021-02-10T00:00:00Z', rate: '44785.07067851158019128044893033856032955957761860064336490' },
  { timestamp: '2021-02-11T00:00:00Z', rate: '47816.62314892935275971616109597909037923187402697629626295' },
  { timestamp: '2021-02-12T00:00:00Z', rate: '47353.26619586669296741906881791115165259247335191781062854' },
  { timestamp: '2021-02-13T00:00:00Z', rate: '47106.24508970693388367644106806953593708164883616516379530' },
  { timestamp: '2021-02-14T00:00:00Z', rate: '48473.15472319709705560342575080547759937329848208043357326' },
  { timestamp: '2021-02-15T00:00:00Z', rate: '47949.73721101783011501151826463340151681943708357606151604' },
  { timestamp: '2021-02-16T00:00:00Z', rate: '49301.61450077877856048381937627629633288742191628846627066' },
  { timestamp: '2021-02-17T00:00:00Z', rate: '52131.86125246504640874105258128982054712179331868624270769' },
  { timestamp: '2021-02-18T00:00:00Z', rate: '51658.95451362735612221505127681446221140836409739078955874' },
  { timestamp: '2021-02-19T00:00:00Z', rate: '56067.26955746177447303147008584409023528098423541920828027' },
  { timestamp: '2021-02-20T00:00:00Z', rate: '56257.79613655734579500783095640956024178969915768377561802' },
  { timestamp: '2021-02-21T00:00:00Z', rate: '57678.88650795719747055814025460883634511689499865433123186' },
  { timestamp: '2021-02-22T00:00:00Z', rate: '54315.96381562988142126178589745301442670313216494639912630' },
  { timestamp: '2021-02-23T00:00:00Z', rate: '49557.87725643360919440923271009411303818103786608054436251' },
  { timestamp: '2021-02-24T00:00:00Z', rate: '49745.53103287831053682310279039188275799988966395363038438' },
  { timestamp: '2021-02-25T00:00:00Z', rate: '47759.28558512600982062013682424052068995516603830384307981' },
  { timestamp: '2021-02-26T00:00:00Z', rate: '46612.60154247072720112237503449809698174406666582135464934' },
  { timestamp: '2021-02-27T00:00:00Z', rate: '46502.2917924421391956681758427754701794170722788977499106' },
  { timestamp: '2021-02-28T00:00:00Z', rate: '45388.69727698520878409200038524314476168309228074817126755' },
  { timestamp: '2021-03-01T00:00:00Z', rate: '49718.08002076000499457768368783213601716906463736104925812' },
  { timestamp: '2021-03-02T00:00:00Z', rate: '48640.67720222754405021244499097668338779781757444241386710' },
  { timestamp: '2021-03-03T00:00:00Z', rate: '50403.59400476075147625186183346436929357517973678819125161' },
  { timestamp: '2021-03-04T00:00:00Z', rate: '48635.35817795193391236381831215125805918200552387347529199' }
]

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
  const { coinHistoricalData, coinSymbol } = props

  const labels = []
  const datasets = []
  for (const key in coinHistoricalData) {
    const coinDetails = coinHistoricalData[key]
    const coinDate = coinDetails.timestamp.substr(0, 10)
    const coinPrice = parseFloat(coinDetails.rate).toFixed(2)
    labels.push(coinDate)
    datasets.push(coinPrice)
  }

  const data = {
    labels: labels,
    datasets: [
      {
        fill: true,
        data: datasets,
        showLine: true,
        pointRadius: 0,
        label: coinSymbol,
        borderColor: '#4b64ce',
        backgroundColor: 'rgba(75, 99, 206, 0.1)'
      }
    ]
  }

  const options = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20
        }
      }],
      yAxes: [
        {
          ticks: {
            beginAtZero: false
          }
        }
      ]
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

const Watermark = () => {
  return (
    <div className='watermark'>
      <div>@tweet_chart</div>
      <div>https://tweetch.art</div>
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

const GeneratedImage = props => {
  const { backendResult } = props
  const { tweetDetails, coinHistoricalData, coinSymbol } = backendResult

  return (
    <div id='generatedImage' className='generatedImage'>
      <TweetImage tweetDetails={tweetDetails} />
      <LineChart coinHistoricalData={coinHistoricalData} coinSymbol={coinSymbol} />
      <Watermark />
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

  return (
    <div id='app'>
      <h1 id='appTitle'>Tweet Chart</h1>
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
              validations={validations.empty}
              placeholder='https://twitter.com/elonmusk/status/1366477626429169666'
            />
          </div>

          <div className='formGroup'>
            <label htmlFor='coinSymbol'>
              Cryptocurrency
            </label>
            <Select
              value='BTC'
              id='coinSymbol'
              name='coinSymbol'
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
                    ? (<React.Fragment>Loading...</React.Fragment>)
                    : (<React.Fragment>Type the tweet URL in the input above</React.Fragment>)
                }
              </div>
              )
        }
      </div>

      <div className='generatedImageWrapper' style={{ display: 'none' }}>
        <GeneratedImage
          backendResult={{
            coinSymbol: 'BTC',
            tweetDetails: demoTweetDetails,
            coinHistoricalData: demoCoinHistoricalData
          }}
        />
      </div>

      {
        backendResult
          ? (<DownloadButton />)
          : null
      }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
