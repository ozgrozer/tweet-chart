const puppeteer = require('puppeteer')

const takeScreenshots = async props => {
  try {
    const { tweetUrl, cryptocurrency } = props

    const splitTweetUrl = tweetUrl.split('/')
    const lastItem = splitTweetUrl[splitTweetUrl.length - 1]
    const splitLastItem = lastItem.split('?')
    const tweetId = splitLastItem[0]

    const lang = 'en'
    const width = 1000
    const padding = 25
    const theme = 'light'
    const hideCard = 'false'
    const hideThread = 'true'

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()
    await page.goto(`https://platform.twitter.com/embed/index.html?dnt=true&embedId=twitter-widget-0&frame=false&hideCard=${hideCard}&hideThread=${hideThread}&id=${tweetId}&lang=${lang}&theme=${theme}&widgetsVersion=ed20a2b%3A1601588405575`, { waitUntil: 'networkidle0' })

    const embedDefaultWidth = 550
    const percent = width / embedDefaultWidth
    const pageWidth = embedDefaultWidth * percent
    const pageHeight = 100
    await page.setViewport({ width: pageWidth, height: pageHeight })

    await page.evaluate(props => {
      const { theme, padding, percent } = props

      const style = document.createElement('style')
      style.innerHTML = "* { font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol' !important; }"
      document.getElementsByTagName('head')[0].appendChild(style)

      const body = document.querySelector('body')
      body.style.padding = `${padding}px`
      body.style.backgroundColor = theme === 'dark' ? '#000' : '#fff'
      body.style.zoom = `${100 * percent}%`
      const articleWrapper = document.querySelector('#app > div')
      articleWrapper.style.border = 'none'
    }, ({ theme, padding, percent }))

    const twitterImage = await page.screenshot({
      type: 'png',
      fullPage: true,
      encoding: 'base64'
    })

    await browser.close()

    return twitterImage
  } catch (err) {
    console.log(err)
  }
}

const generateImages = async (req, res) => {
  const { tweetUrl, cryptocurrency } = req.body
  const images = await takeScreenshots({ tweetUrl, cryptocurrency })
  res.json(images)
}

module.exports = generateImages
