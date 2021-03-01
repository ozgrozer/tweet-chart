const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 1300

app.use(express.static(path.join(__dirname, '..', '..', 'dist')))

app.listen(port, () => {
  console.log('Example app listening on port http://localhost:' + port)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'))
})

app.post('/generate-image', require('./generateImage'))
