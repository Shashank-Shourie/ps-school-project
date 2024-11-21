const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Post = require('../models/Post');
const User = require('../models/user');
const Comments = require('../models/comment')
// Create post
router.post('/', auth, async (req, res) => {
  try {
    let stags = req.body.tags
    console.log(stags);
    const post = new Post({
      ...req.body,
      tags:stags,
      author: req.user._id
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update post
router.patch('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, author: req.user._id });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    Object.assign(post, req.body);
    post.updatedAt = Date.now();
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    await Comments.deleteMany({postId:req.params.id}); 

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/like', async (req, res) => {
  try {
    const { userId } = req.body; // Assuming userId is passed in request body
    const post = await Post.findById(req.params.id);
    const user = await User.findById(userId);

    if (!post || !user) return res.status(404).json({ message: 'Post or user not found' });

    const hasLiked = user.likedPosts.includes(post._id);

    if (hasLiked) {
      post.likes -= 1;
      user.likedPosts = user.likedPosts.filter(postId => postId.toString() !== post._id.toString());
    } else {
      post.likes += 1;
      user.likedPosts.push(post._id);
    }

    await post.save();
    await user.save();

    res.json({ likes: post.likes, liked: !hasLiked });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;