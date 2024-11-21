const { fetchUsersData } = require("../db/cache");
const { redis, pool } = require("../db/db");
// receive the email in the request that has to be validated and server checks the data in redis if it exists it is returned otherwise 404 response is provided
const homeRequestHandler = async (req, res) => {
  const requestedEmail = req.body.email;
  const redisKey = "users:email";
  try {
    const FetchEmailsFromRedisCache = await redis.get(redisKey);

    if (FetchEmailsFromRedisCache) {
      const redisDataParsed = JSON.parse(FetchEmailsFromRedisCache);

      let emailFound = false;
// 
      for (const emails of redisDataParsed) {
        if (emails.email === requestedEmail) {
          emailFound = true;
          break;
        }
      }

      if (emailFound) {
        // return res.status(200).send("Email Exist, Validation Approved");
        return res.status(200).send(redisDataParsed);
      } else {
        return res.status(404).send("Email Doesnt Exist, Validation Denied");
      }
    }
  } catch (error) {
    console.log(
      "couldnt proceed with the request please try again letter",
      error
    );
  }
};
const postgressDataHandler = async (req, res) => {
  const requestedEmail = req.body.name;
  const redisKey = `users:postgressData`;
  try {
    const FetchEmailsFromRedisCache = await redis.get(redisKey);

    if (FetchEmailsFromRedisCache) {
      const redisDataParsed = JSON.parse(FetchEmailsFromRedisCache);

      let nameFound = false;

      for (const names of redisDataParsed) {
        if (names.name === requestedEmail) {
          nameFound = true;
          break;
        }
      }

      if (nameFound) {
        return res.status(200).send(redisDataParsed);
      } else {
        return res.status(404).send("Name Doesnt Exist, Try a different name");
      }
    }
  } catch (error) {
    console.log(
      "couldnt proceed with the request please try again letter",
      error
    );
  }
};

module.exports = { homeRequestHandler, postgressDataHandler };
