const express = require('express');
const { HfInference } = require('@huggingface/inference');
require('dotenv').config(); // For loading environment variables

const History = require('../models/History');

const router = express.Router();
const hf = new HfInference(process.env.HF_API_KEY);

router.post('/summarize', async (req, res) => {
    console.log(hf);
    const { text } = req.body;
    try {
        const result = await hf.request({
            model: 'facebook/bart-large-cnn',
            inputs: text,
        });
        console.log(result);
        const summary = result[0]?.summary_text || 'No summary available';
        res.json({ summary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error summarizing text' });
    }
});


router.post('/generate', async (req, res) => {
    console.log(hf);
    const { prompt } = req.body;
    const {userId} = req.userId;
    try {
        const result = await hf.textGeneration({
            model: 'meta-llama/Llama-3.2-3B-Instruct',
            inputs: prompt,
            parameters: { 
                max_new_tokens: 1000,
                temperature: Math.random(),
                top_k: 1000,
                top_p: 0.9
            },
            options: { timeout: 180000 }
        });

        console.log(result.generated_text);
        res.json({ blogPost: result.generated_text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating text' });
    }
});

module.exports = router;
