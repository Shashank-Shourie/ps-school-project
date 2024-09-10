const express = require('express');
const router = express.Router();
// const Post = require('../models/posts');

//routes
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "Home",
            description: "Blog web"
        }
        
        res.render('index', {locals});
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;