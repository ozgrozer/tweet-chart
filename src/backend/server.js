const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 1300

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') })

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', '..', 'dist')))

app.listen(port, () => {
  console.log('Example app listening on port http://localhost:' + port)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'))
})

app.post('/generate-images', require('./generateImages'))
