const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3009;
const routeHandler = require("./routes/routes");
const { limiter } = require("./middlewares/middlewares");
const { cacheData } = require("./db/cache");
const { redis } = require("./db/db");

const retriggerCache = async () => {
  const redisKey = "users:email";
  const TTL = await redis.ttl(redisKey);
  if (TTL === -2) {
    await cacheData();
  }
};
const retriggerCacheP = async () => {
  const redisKey = "users:postgressData";
  const TTL = await redis.ttl(redisKey);
  if (TTL === -2) {
    await cacheData();
  }
};

const refreshCache = () => {
  cacheData();
  setInterval(async () => {
    await retriggerCache();
    await retriggerCacheP();
  }, 3650 * 1000);
};
// 
refreshCache();
app.use(express.static('Public'))
app.use(express.json());
app.use(limiter);
app.use(routeHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
