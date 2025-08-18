const Post = require("../models/Post");
const logger = require("../utils/logger");
const { validateCreatePost } = require("../utils/validation");

const createPost = async (req, res) => {
  try {
    logger.info("create post endpoint");
    const { error } = validateCreatePost(req.body);
    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { content, mediaIds } = req.body;
    const newlyCreatedPost = new Post({
      user: req.user.userId,
      content,
      mediaIds: mediaIds || [],
    });

    await newlyCreatedPost.save();

    res.status(201).json({
      success: true,
      message: "post created successfully",
    });
  } catch (error) {
    logger.error("Error creating post", error);
    res.status(400).json({
      success: false,
      message: "Error creating post",
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
  } catch (error) {
    logger.error("Error fetching posts", error);
    res.status(400).json({
      success: false,
      message: "Error fetching posts",
    });
  }
};

const getPost = async (req, res) => {
  try {
  } catch (error) {
    logger.error("Error fetching post", error);
    res.status(400).json({
      success: false,
      message: "Error fetching post by id",
    });
  }
};

const deletePost = async (req, res) => {
  try {
  } catch (error) {
    logger.error("Error deleting posts", error);
    res.status(400).json({
      success: false,
      message: "Error deleting posts",
    });
  }
};

module.exports = { createPost };
