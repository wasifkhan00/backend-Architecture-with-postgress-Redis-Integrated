const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const cache = require("./cache");
const Redis = require("ioredis");
const db = process.env.DB_HOST;
const { Pool } = require("pg");

const config = {
  user: process.env.Aiven_Postgres_User,
  password: process.env.Aiven_Postgres_Password,
  host: process.env.Aiven_Postgres_Host,
  port: process.env.Aiven_Postgres_Port,
  database: process.env.Aiven_Postgres_Database,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.Aiven_CA,
  },
};

const pool = new Pool(config);

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  } else {
    console.log("Connected to the Postgress");
  }
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

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

module.exports = { dbInteraction, redis, pool };
