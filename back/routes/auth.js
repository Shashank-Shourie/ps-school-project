const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Note = require('../models/Note');

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

router.post('/editusername', async (req, res) => {
  const { id, username } = req.body;
  try {
      const namecheck = await User.findOne({ username });
      if (namecheck) {
          return res.status(400).json({ error: "Username already exists" });
      }
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }
      user.username = username;
      await user.save();
      res.json(user);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while updating the username" });
  }
});

router.post('/notevalues',async(req,res)=>{
  const {author} = req.body;
  try {
    const note = await Note.findOne({author:author});
    text = note.text;
    return res.status(201).json({text});
  } catch (error) {
    console.log(error);
    res.status(400).json({error:error.message});
  }
})

router.post('/Notes',async(req,res)=>{
  const {author,text} = req.body;
  try{
    const check = await Note.findOne({author:author});
    if(!check){
      console.log("New Note created");
      const note = new Note({author,text});
      await note.save();
      return res.status(201).json({text});
    }
    check.text = text;
    await check.save();
    return res.status(201).json({text});
  } catch(error){
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
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