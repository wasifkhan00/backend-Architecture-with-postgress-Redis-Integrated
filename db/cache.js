const { dbInteraction, redis, pool } = require("./db");
//fetch the database and cache all data into the redis for easy retrieval with an expiry of 1 hour or 3600 seconds
const cacheData = async () => {
  // for mongodb
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
  // for postgress

  try {
    const RetrieveData = `SELECT * FROM employees`;

    const fetchDataFromPostgres = await pool.query(RetrieveData);
    const postgressData = fetchDataFromPostgres.rows;

    if (postgressData.length === 0) {
      return null;
    } else {
      const redisKey = `users:postgressData`;
      const createCache = await redis.set(
        redisKey,
        JSON.stringify(postgressData),
        "EX",
        3600
      );
    }
  } catch (error) {
    console.log(error, "error");
  }
};

module.exports = { cacheData };
