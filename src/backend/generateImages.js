const axios = require('axios')

const time = require('./../common/time')

const getTweetDetails = async props => {
  try {
    const { tweetUrl } = props

    const splitTweetUrl = tweetUrl.split('/')
    const lastItem = splitTweetUrl[splitTweetUrl.length - 1]
    const splitLastItem = lastItem.split('?')
    const tweetId = splitLastItem[0]

    const response = await axios({
      method: 'get',
      url: `https://api.twitter.com/2/tweets?ids=${tweetId}&tweet.fields=created_at,public_metrics,source&expansions=author_id&user.fields=created_at,profile_image_url`,
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
      }
    })

    return response.data
  } catch (e) {
    console.log('getTweetDetails issue')
    console.log(e.message)
  }
}

const monthDiff = (d1, d2) => {
  let months
  months = (d2.getFullYear() - d1.getFullYear()) * 12
  months -= d1.getMonth()
  months += d2.getMonth()
  return months <= 0 ? 0 : months
}

const datesForNomics = props => {
  const { date } = props

  const tweetCreatedDate = new Date(date)
  const nowDate = new Date()
  const nowUnixTime = +new Date()
  const monthsPast = monthDiff(tweetCreatedDate, nowDate)
  const beforeRatio = 3
  const _totalMonthsBefore = Math.ceil(monthsPast + (monthsPast / beforeRatio))
  const totalMonthsBefore = _totalMonthsBefore < 1 ? 1 : _totalMonthsBefore
  const totalMonthsBeforeUnixTime = nowDate.setMonth(nowDate.getMonth() - totalMonthsBefore)
  const startDate = time({ unixTime: totalMonthsBeforeUnixTime, format: 'yyyy-MM-dd' })
  const endDate = time({ unixTime: nowUnixTime, format: 'yyyy-MM-dd' })
  console.log({ monthsPast, totalMonthsBefore, startDate, endDate })

  return { startDate, endDate }
}

const getCoinHistoricalData = async props => {
  try {
    const { tweetDetails, coinSymbol } = props

    const tweetData = tweetDetails.data[0]
    const { startDate, endDate } = datesForNomics({ date: tweetData.created_at })

    const response = await axios({
      method: 'get',
      url: `https://api.nomics.com/v1/exchange-rates/history?key=${process.env.NOMICS_API_KEY}&format=json&currency=${coinSymbol}&start=${startDate}T00%3A00%3A00Z&end=${endDate}T00%3A00%3A00Z`
    })

    return response.data
  } catch (e) {
    console.log('getCoinHistoricalData issue')
    console.log(e.message)
  }
}

const generateImages = async (req, res) => {
  const { tweetUrl, coinSymbol } = req.body
  const tweetDetails = await getTweetDetails({ tweetUrl })
  const coinHistoricalData = await getCoinHistoricalData({ tweetDetails, coinSymbol })
  const result = { tweetDetails, coinHistoricalData, coinSymbol }
  res.json(result)
}

module.exports = generateImages
