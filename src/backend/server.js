const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 1300

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') })

const axios = require('axios')
const getHistoricalData = async props => {
  const currency = 'BTC'
  const startDate = '2021-01-01'
  const endDate = '2021-01-31'
  const apiKey = process.env.NOMICS_API_KEY
  const url = `https://api.nomics.com/v1/exchange-rates/history?key=${apiKey}&format=json&currency=${currency}&start=${startDate}T00%3A00%3A00Z&end=${endDate}T00%3A00%3A00Z`
  const response = await axios({ url, method: 'get' })
  console.log(response)
}
getHistoricalData()

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', '..', 'dist')))

app.listen(port, () => {
  console.log('Example app listening on port http://localhost:' + port)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'))
})

app.post('/generate-images', require('./generateImages'))
