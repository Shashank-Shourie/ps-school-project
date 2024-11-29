const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/editusername', async (req,res) => {
  const {id,username} = req.body;
  console.log(id);
  console.log(username);
  const namecheck = await User.findOne({username:username});
  if(!namecheck) res.status(404).json({error:"user already exist"})
  const user = await User.findById(id);
  Object.assign(user, req.body);
  await user.save();
  res.json(user);
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid login credentials');
    }
    
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;