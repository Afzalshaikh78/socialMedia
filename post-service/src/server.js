const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const postRoutes = require('./routes/post-routes')
const errorHandler = require("./middleware/errorHandler");
const Redis = require('ioredis')



const PORT = process.env.PORT || 3002;

//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info("Connected to mongodb"))
  .catch((e) => logger.error("Mongo connection error", e));

const redisClient = new Redis(process.env.REDIS_URL);

//middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Request body, ${req.body}`);
  next();
});


app.use(
  "/api/posts",
  (req, res, next) => {
    req.redisClient = redisClient;
    next();
  },
  postRoutes
);

app.use(errorHandler);


app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`post services are running on port ${PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled rejection at", promise, "reason: ", reason);
});
