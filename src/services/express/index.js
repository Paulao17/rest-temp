const express = require('express')
const bodyParser = require('body-parser')
const env = require('../../../config').env


module.exports = (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    //app.use(cors())
    //app.use(compression())
    //app.use(morgan('dev'))
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)
  //app.use(queryErrorHandler())
  //app.use(bodyErrorHandler())

  return app
}
