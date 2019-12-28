let http = require('http')
const config = require('./config')
let mongoose = require('./src/services/mongoose')
let express = require('./src/services/express')
let api = require('./src/api')

const app = express('', api)
const server = http.createServer(app)

mongoose.connect(config.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(config.port, config.ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', config.ip, config.port, config.env)
  })
})

module.exports = app
