const express = require('express');
const router = express.Router();

const Profile = require('../models/Profile');

const serverAuth = require('../utils/serverAuth');
const userAuthenticated = serverAuth.userAuthenticated;

const userData = {
  name: 'Jane Doe',
  email: 'jane@something.com',
  type: process.env.AUTH_USER_TYPE,
};

/**
 * Getting user person profile information
 */
router.get('/', async (req, res) => {
  // if user is authenticated (checks signed cookies from request)
  try {
    if (userAuthenticated(req)) {
      console.log('User was authenticated');
      // send response back to user
      return res.json(userData);
    } else throw Error('Forbidden access to profile!');
  } catch (err) {
    return res.status(403).json(err);
  }
});

/**
 * Getting all profile data
 */
router.get('/all', async (req, res) => {
  try {
    const profile = await Profile.find();

    res.status(200).json(profile);
  } catch (err) {
    res.status(404);
  }
});

/**
 * Editing profile sidebar data
 */
router.post('/sidebar', async (req, res) => {
  const { title, content } = req.body;

  // const newProfileAbout = new Profile({
  //   type: 'sidebar',
  //   title: title ? title : 'the author',
  //   content: content
  // });

  try {
    // await Profile.findOneAndDelete('5e26afb465c134bf114360d8');

    if (userAuthenticated(req)) {
      const profileSaved = await Profile.findOneAndUpdate(
        { type: 'sidebar' },
        {
          title: title ? title : 'the author',
          content: content,
        }
      );

      res.status(200).json(profileSaved);
    } else throw Error('User not authenticated.');
  } catch (err) {
    res.status(403).json();
    console.log(err);
  }
});

/**
 * Editing profile about data
 */

router.post('/about', async (req, res) => {
  const { content } = req.body;

  try {
    if (userAuthenticated(req)) {
      const profileSaved = await Profile.findOneAndUpdate(
        { type: 'about' },
        { content }
      );

      res.status(200).json(profileSaved);
    } else throw Error('User not authenticated.');
  } catch (err) {
    res.status(403).json();
    console.log(err);
  }
});

/**
 * Editing profile contact data
 */

module.exports = router;
