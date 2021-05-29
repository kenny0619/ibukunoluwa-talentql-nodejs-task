// import error response from utils
const ErrorResponse = require("../utils/errorResponse");

// import model
const Post = require("../models/post.model");

// import asyncHandler middleware
const asyncHandler = require("../middlewares/async.middleware");

/**
 * @description fetch all posts
 * @route       GET /api/v1/posts
 * @access      Public
 */
exports.fetchAllPosts = asyncHandler(async (req, res, next) => {
  let query;

  // copy query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // loop over removeFields and delete from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // create query string
  let queryStr = JSON.stringify(reqQuery);

  // create operators (gt, gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/gi,
    (match) => `$${match}`
  );

  // finding resource
  query = Post.find(JSON.parse(queryStr));

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Post.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // executing query
  const posts = await query;

  // pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  res.status(200).json({
    success: true,
    count: posts.length,
    pagination,
    payload: posts,
    statusCode: 200,
    error: null,
  });
});

/**
 * @description fetch single post
 * @route       GET /api/v1/posts/ :id
 * @access      Public
 */
exports.fetchPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`post not found with an id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    payload: post,
    statusCode: 200,
    error: null,
  });
});

/**
 * @description Create post
 * @route       POST /api/v1/posts
 * @access      Private
 */
exports.createPost = asyncHandler(async (req, res, next) => {
  const post = await Post.create(req.body);
  res
    .status(201)
    .json({ success: true, payload: post, statusCode: 201, error: null });
});

/**
 * @description Update/Edit post
 * @route       PATCH /api/v1/posts/:id
 * @access      Private
 */
exports.editPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    return next(
      new ErrorResponse(`post not found with an id of ${req.params.id}`, 404)
    );
  }
  res
    .status(200)
    .json({ success: true, payload: post, statusCode: 200, error: null });
});

/**
 * @description Delete post
 * @route       DELETE /api/v1/posts/:id
 * @access      Private
 */
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`post not found with an id of ${req.params.id}`, 404)
    );
  }

  res
    .status(200)
    .json({ success: true, payload: null, statusCode: 200, error: null });
});
