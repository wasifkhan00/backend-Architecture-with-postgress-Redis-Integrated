const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const cache = require("./cache");
const Redis = require("ioredis");
const db = process.env.DB_HOST;

//connecting to the database
mongoose
  .connect(db)
  .then(() => console.log("Connected to the Mongodb"))
  .catch((err) => console.error("Mongodb Database connection error:", err));
//
let data = new Schema({
  email: { type: String, required: true, unique: true },
}); 
const dbInteraction = model("STERPASA", data);

// connecting to the Redis
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 13908,
  db: 0,
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

module.exports = { dbInteraction, redis };
