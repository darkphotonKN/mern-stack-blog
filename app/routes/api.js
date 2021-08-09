const express = require('express');
const router = express.Router();

const serverAuth = require('../utils/serverAuth');
const authenticate = serverAuth.authenticate;
const userAuthenticated = serverAuth.userAuthenticated;

const dev = process.env.NODE_ENV !== 'production';

const Post = require('../models/Post');

// cookie extra options
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true, // allows verifying source of the cookie and prevent modified cookies
};

const userData = {
  name: 'Jane Doe',
  email: 'jane@something.com',
  type: process.env.AUTH_USER_TYPE,
};

/**
 * Logging in User
 */
router.post('/login', async (req, res) => {
  console.log('REQ BODY:', req.body);
  const { username, password } = req.body;

  const user = await authenticate(username, password);

  if (!user) {
    // return to prevent rest of the function from running
    return res.status(403).send('Credentials wrong, error logging in');
  }

  // creating and sending back signed cookies to the client
  res.cookie('token', userData, COOKIE_OPTIONS);

  // return user info
  res.json(userData);
});

/**
 * Fetches list of all posts
 */
router.get('/posts', async (req, res) => {
  console.log('Page Length:', req.query.size);
  console.log('Page Number:', req.query.page);

  const { page, size } = req.query;
  try {
    const posts = await Post.find();
    const total = posts.length;
    // if (userAuthenticated(req)) {
    // return to user the list of posts

    let currentPosts = [];
    if (size) {
      // get requested page of posts
      currentPosts = posts.reverse().splice((page - 1) * size, page * size);
    } else {
      // return all posts
      currentPosts = posts.reverse();
    }

    res.json({ total, currentPosts });
    // } else throw err;
  } catch (err) {
    res.status(403).json('Forbidden access to list of posts.');
  }
});

/**
 * Fetches a single blog post
 */
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.json(post);
  } catch (err) {
    res.status(403).json(err);
  }
});

/**
 * Adding a new blog post
 */
router.post('/posts', async (req, res) => {
  // generating new post obj to add to DB
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    date: new Date(),
  });

  // using async await
  let postSaved;

  try {
    if (userAuthenticated(req)) {
      postSaved = await post.save();
      res.status(200).json(postSaved);
    } else throw Error('User not authenticated.');
  } catch (err) {
    res.status(403).json(err);
  }
});

/**
 * Editing a blog post
 */
router.post('/posts/:id', async (req, res) => {
  try {
    if (userAuthenticated(req)) {
      // find and update post
      const postSaved = await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          content: req.body.content,
          date: new Date(),
        }
      );

      res.status(201).json(postSaved);
    } else throw Error('User not authenticated.');

    res.status(200).json(postSaved);
  } catch (err) {
    res.status(403).json(err);
  }
});

/**
 * Deleting a blog post
 */

router.post('/posts/delete/:id', async (req, res) => {
  try {
    if (userAuthenticated(req)) {
      const post = await Post.findByIdAndDelete(req.params.id);
      res.json(post);
    } else throw Error('User not authenticated.');
  } catch (err) {
    res.status(403).json(err);
  }
});

module.exports = router;
