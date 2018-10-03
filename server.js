const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 8080

var tasks = require('./routes/tasks')
var auth = require('./routes/auth')

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())

// api/auth
app.use('/api/auth', auth)

// api/tasks
app.use('/api/tasks', tasks)

app.listen(8080, () => console.log(`Express is listening to port ${port}...`))