const express = require("express")
require("dotenv").config();
const path = require('path')
const bodyParser = require("body-parser")
const cors = require('cors')
const appRootPath = require('app-root-path')
const morgan = require('morgan')
const createRKey = require('./src/helpers/createRandomkey')
// createRKey(12)
const {checkClient} = require('./src/middlewares/authentication.middleware')

const PATH = appRootPath.path

const { randomBytes } = require("node:crypto")
const api = require("./src/apis")
const connectMongo = require("./src/connection/mongo")
const {connectRedis} = require("./src/connection/redis");

const PORT = process.env.PORT || 6000;

const app = express()

app.use(express.static(path.join(PATH,'src','public')))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors())
app.use(morgan('combined'))
app.use(checkClient)

api(app)

app.use((err,req,res,next) => {

  return res.status(err.status||500).json({
    status: err.status || 500,
    message: err.message
  })

})
app.listen(PORT, () => {
  connectMongo()
  connectRedis()
  console.log("listening on port:::", PORT);
});
