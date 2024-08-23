const connectToMongo = require('./db');

connectToMongo();

const express = require('express')
const app = express()
const port = 5000

var cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())

// Available Routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNoteBook app listening on port http://localhost:${port}`)
})