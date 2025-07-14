const Post = require('../models/Post');

// ✅ Get all posts (public)
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('category')
      .populate('user', 'name email'); // Populate user name/email

    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// ✅ Get a single post by ID (public)
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('category')
      .populate('user', 'name email');

    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// ✅ Create a new post (protected)
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;

    const newPost = new Post({
      title,
      content,
      category,
      user: req.user.id // 👈 Attach the logged-in user
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    next(err);
  }
};

// ✅ Update a post (protected)
exports.updatePost = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, category },
      { new: true }
    );

    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
};

// ✅ Delete a post (protected)
exports.deletePost = async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });

    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};

// ✅ (Optional) Get posts created by the logged-in user
exports.getMyPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .populate('category');

    res.json(posts);
  } catch (err) {
    next(err);
  }
};
