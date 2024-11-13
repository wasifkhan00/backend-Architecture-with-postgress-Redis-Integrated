const jwtToken = require("jsonwebtoken");
const { rateLimit } = require("express-rate-limit");
//limit api requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: `You've exceeded the limits per request Try again after 15 minutes`,
});

module.exports = {limiter, jwtToken};
