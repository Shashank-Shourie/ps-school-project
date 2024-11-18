const express=require('express');
const router =express.Router();

const History = require('../models/History');

router.post('/chathistory',async (req,res)=>{
    let {userId} = req.body;
    try{
        const hist = await History.find({
            by:userId
        })
        console.log(hist);
        res.json(hist)
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

router.post('/newchat',async(req,res)=>{
    let {userId} = req.body;
    try{
        const newchat = await History.create({
            by:userId
        });
        res.status(201).json(newchat);
    }catch(err){
        res.status(400).json({ error: err.message });
    }
   
});

module.exports = router;