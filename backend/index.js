const connectToMongo = require('./db')
let cors = require('cors')
const express = require('express')
connectToMongo()
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Slice app Backend listening at http://localhost:${port}`)
})

