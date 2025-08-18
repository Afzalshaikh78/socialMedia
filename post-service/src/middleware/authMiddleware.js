const logger = require("../utils/logger")

const authenticateRequest = async (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    logger.warn("Access attempted without userid");
    return res.status(400).json({
      success: false,
      message: "Authentication required!"
    })
  }

  req.user = { userId }
  next();
}


module.exports = {authenticateRequest}