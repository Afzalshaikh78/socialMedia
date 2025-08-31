// const express = require("express");
// require('dotenv').config();
// const mongoose = require("mongoose");
// const logger = require("./utils/logger");
// const app = express();
// const helmet = require("helmet");
// const cors = require("cors");
// const { RateLimiterRedis } = require("rate-limiter-flexible");
// const { rateLimit } = require("express-rate-limit");
// const { RedisStore } = require("rate-limit-redis");
// const routes = require("./routes/identity-service")
// const errorHandler = require("./middleware/errorHandler");

// const Redis = require("ioredis");

// const PORT = process.env.PORT;


// //connect to db
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => logger.info("Connected to mongodb"))
//   .catch((e) => logger.error("Mongo connection error", e));

// const redisClient = new Redis(process.env.REDIS_URL);

// //middleware

// app.use(helmet());
// app.use(cors());
// app.use(express.json());

// app.use((req, res, next) => {
//   logger.info(`Received ${req.method} request to ${req.url}`);
//   logger.info(`Request body ${req.body}`);
//   next();
// });

// //ddos protection

// const rateLimiter = new RateLimiterRedis({
//   storeClient: redisClient,
//   keyPrefix: "middleware",
//   points: 10,
//   duration: 1,
// });

// app.use((req, res, next) => {
//   rateLimiter
//     .consume(req.ip)
//     .then(() => next())
//     .catch(() => {
//       logger.warn(`Rate limit exceeded for IP: ${req.ip}`);

//       res.status(429).json({
//         success: false,
//         message: "Too many requests",
//       });
//     });
// });

// //ip based rate limiting for senstive
// const senstiveEndpointsLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 50,
//   standardHeaders: true,
//   legacyHeaders: false,
//   handler: (req, res) => {
//     logger.warn(`Sensitive endpoint rate limit exceeded for ip: ${req.ip}`);
//     res.status(429).json({
//       success: false,
//       message: "Too many requests",
//     });
//   },
//   store: new RedisStore({
//     sendCommand: (...args) => redisClient.call(...args),
//   }),
// });

// //apply this
// app.use("/api/auth/register", senstiveEndpointsLimiter);

// //routes

// app.use("/api/auth", routes);

// //error handler

// app.use(errorHandler);

// app.listen(PORT, () => {
//   logger.info(`identity services are running on port ${PORT}`);
// });

// process.on("unhandledRejection", (reason, promise) => {
//   logger.error("Unhandled rejection at", promise, "reason: ", reason);
// });
