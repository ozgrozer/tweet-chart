const generateImage = async (req, res) => {
  const { tweetUrl, cryptocurrency } = req.body

  const splitTweetUrl = tweetUrl.split('/')
  const lastItem = splitTweetUrl[splitTweetUrl.length - 1]
  const splitLastItem = lastItem.split('?')
  const tweetId = splitLastItem[0]

  const result = {
    tweetId,
    cryptocurrency,
    success: false
  }

  res.json(result)
}

module.exports = generateImage
