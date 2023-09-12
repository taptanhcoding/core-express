
const mongoose  = require("mongoose");
const link = require("../configs/mongo.config.js")

async function connectMongo() {
  try {
    await mongoose.connect(link, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongo at ",link);
  } catch (error) {
    console.log("Connect error: ",error);
  }
}

module.exports =  connectMongo;
