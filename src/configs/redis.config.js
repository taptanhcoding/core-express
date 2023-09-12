require('dotenv').config()

const redisConfig = {
    dev: {
      socket: {
        host:"redis://127.0.0.1",
        post: 6379
      }
    },
    product: {
        socket:{
          host:process.env.REDIS_HOST,
          port: process.env.REDIS_PORT
        },
        password: process.env.REDIS_PASSWORD
      }
}

module.exports = redisConfig[process.env.ENVIRONMENT]