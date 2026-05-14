const Redis = require("ioredis").default
const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})
redis.on("connect", () => {
    console.log("redis is connected")
})
redis.on("error", () => {
    console.log("redis connection error")
})
module.exports = redis