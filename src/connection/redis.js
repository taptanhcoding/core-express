const { createClient } = require("redis");
const redisConfig = require("../configs/redis.config.js");

const client = createClient();
async function connectRedis() {
  try {
    await client.connect(redisConfig);
    console.log("connect redis success");
  } catch (error) {
    console.log("connected redis faillure!!! ", error);
  }
}

module.exports = { connectRedis, client };
