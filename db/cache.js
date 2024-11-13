const { dbInteraction, redis } = require("./db");
//fetch the database and cache all data into the redis for easy retrieval with an expiry of 1 hour or 3600 seconds
const cacheData = async () => {
  try {
    const fetchDataFromDb = await dbInteraction.find({});
    if (fetchDataFromDb.length === 0) {
      console.log("No data found in MongoDB.", fetchDataFromDb);
      return null;
    } else {
      const redisKey = `users:email`;
      const createCache = await redis.set(
        redisKey,
        JSON.stringify(fetchDataFromDb),
        "EX",
        3600
      );
    }
  } catch (error) {
    console.log(error, "error");
  }
};

module.exports = { cacheData };
