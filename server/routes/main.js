const express = require('express');
const router = express.Router();
const Post = require('../models/posts');

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
        let perpage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perpage * page - perpage)
            .limit(perpage)
            .exec();

        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasnextpage = nextPage <= Math.ceil(count / perpage);
        const prevPage = page-1;
        const hasprevPage = prevPage !=0;
        res.render('viewblog', { locals,
            data,
            current: page,
            nextPage: hasnextpage ? nextPage : null,
            prevPage: hasprevPage ? prevPage :null});
    } catch (error) {
        console.log(error);
    }
});
router.get('/post/:id',async (req,res) => {
    try {
        let slug = req.params.id;
        const data = await Post.findById({_id:slug});
        const locals = {
            title: data.title,
            description: "Blog web"
        }
        res.render('post',{locals,data,currentRoute:`/post/${slug}`});
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