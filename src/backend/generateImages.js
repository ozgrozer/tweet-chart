const axios = require('axios')

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
    console.log(e)
  }
}

const generateImages = async (req, res) => {
  const { tweetUrl, cryptocurrency } = req.body
  const tweetDetails = await getTweetDetails({ tweetUrl })
  const result = { tweetDetails }
  res.json(result)
}

module.exports = generateImages
