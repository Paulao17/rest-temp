const fs = require('fs')

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    jwtSecret: fs.readFileSync('private.key'), // ssh-keygen -t rsa -b 2048 -m PEM -f private.key
    mongo: {
      options: {
        /*db: {
          safe: true
        }*/
      }
    }
  },
  test: {
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://10.8.0.1/cvl-dev'
    }
  },
  development: {
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://10.8.0.1/cvl-dev',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || 'localhost',
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://10.8.0.1/cvl'
    }
  }
}

module.exports = {...config.all, ...config[config.all.env]}
