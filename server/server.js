
const path = require('path')
const express = require('express')
const app = express()
const PUBLIC_PATH = path.resolve(__dirname, '../public')
const PORT = process.env.PORT || 9001

app.use(express.static(PUBLIC_PATH))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'))
})

app.listen(PORT, () => {
  console.log('server running')
})
