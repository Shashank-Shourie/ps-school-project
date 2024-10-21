const express = require('express');
const router = express.Router({mergeParams:true});
const auth = require('../middlewares/auth');
const comment = require('../models/comment');

router.post('/', auth,async (req,res)=>{
    try{
        const {id} = req.params;
        const {content} = req.body;

        if (!content) {
            return res.status(400).json({ error: "Content is required" });
        }
        const Comment = new comment({
            content,
            author: req.user._id,
            postId: id
        });
        await Comment.save()
        res.status(201).json(Comment);
    } catch(err){
        res.status(400).json({error: err.message});
    }
});

router.get('/', async (req,res)=>{
    try{
        const comments = await comment.find({postId:req.params.id}).populate('author','username');
        res.json(comments);
    } catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports = router;