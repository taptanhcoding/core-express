require('dotenv').config()

const collection ={
    dev:  "mongodb://127.0.0.1:27017/core-be",
    product: "mongodb://127.0.0.1:27017/"
}

module.exports =  collection[process.env.ENVIRONMENT]