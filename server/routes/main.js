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
router.get('/wcblog', async (req, res) => {
    try {
        const locals = {
            title: "Write Blog",
            description: "Blog web"
        }
        
        res.render('wcblog', {locals});
    } catch (error) {
        console.log(error);
    }
});
router.get('/viewblog', async (req, res) => {
    try {
        const locals = {
            title: "View Blogs",
            description: "Blog web"
        }
        
        res.render('viewblog', {locals});
    } catch (error) {
        console.log(error);
    }
});
router.get('/AI', async (req, res) => {
    try {
        const locals = {
            title: "AI",
            description: "Blog web"
        }
        
        res.render('AI', {locals});
    } catch (error) {
        console.log(error);
    }
});
router.get('/login', async (req, res) => {
    try {
        const locals = {
            title: "login",
            description: "Blog web"
        }
        
        res.render('login', {locals});
    } catch (error) {
        console.log(error);
    }
});
router.get('/signup', async (req, res) => {
    try {
        const locals = {
            title: "signup",
            description: "Blog web"
        }
        
        res.render('signup', {locals});
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;