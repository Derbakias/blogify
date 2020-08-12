const express = require("express");
const router = express.Router();
const privateRoute = require("../middleware/privateRoute");
const jwt = require("jsonwebtoken");
const config = require("config");
const {
  check,
  validationResult,
} = require("express-validator");

const Post = require("../models/Post");
const User = require("../models/User");

// @ POST /api/posts
// @ create a post
// private
router.post(
  "/",
  [
    privateRoute,
    [
      check("title", "Post title is required")
        .not()
        .isEmpty(),
      check("body", "Post body is required")
        .not()
        .isEmpty(),
      check("type", "Type is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const { title, body, type } = req.body;
    const { username } = await User.findById(
      req.user
    ).select("username -_id");
    try {
      const newPost = new Post({
        author: username,
        title,
        body,
        type,
        author_id: req.user,
      });

      await newPost.save();
      res
        .status(200)
        .json({ msg: "Post published successfully!" });
    } catch (err) {
      console.log(err.message);
      req.status(500).json({ msg: "Server Error" });
    }
  }
);

// @ GET /api/posts
// @ read a post
// private
router.get("/", privateRoute, async (req, res) => {
  try {
    const user = req.user;

    const posts = await Post.find({
      $or: [
        {
          author_id: user,
        },
        { type: "public" },
      ],
    }).sort({ date: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @ GET /api/posts/:id
// @ read a post
// private
router.get("/:id", privateRoute, async (req, res) => {
  try {
    const user = req.user;

    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @ POST /api/posts/:id
// @ update a post
// private
router.put(
  "/:id",
  [
    privateRoute,
    [
      check("title", "Post title is required")
        .not()
        .isEmpty(),
      check("body", "Post body is required")
        .not()
        .isEmpty(),
      check("type", "Type is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }
    const { title, body, type } = req.body;
    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (body) updatedFields.body = body;
    if (type) updatedFields.type = type;

    try {
      let post = await Post.findById(req.params.id);
      if (!post)
        return res
          .status(400)
          .json({ msg: "Post not found!" });
      if (post.author_id.toString() !== req.user) {
        return res
          .status(400)
          .json({ msg: "Access Denied!" });
      }
      await Post.findByIdAndUpdate(
        req.params.id,
        { $set: updatedFields },
        { new: true }
      );
      res
        .status(200)
        .json({ msg: "Post updated successfully" });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @ DELETE /api/posts/:id
// @ delete a post
// private
router.delete("/:id", privateRoute, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post)
      return res
        .status(400)
        .json({ msg: "Post not found!" });
    if (post.author_id.toString() !== req.user.toString()) {
      return res
        .status(400)
        .json({ msg: "Access Denied!" });
    } else {
      await Post.findByIdAndRemove(req.params.id);
      res
        .status(200)
        .json({ msg: "Post deleted successfully" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
