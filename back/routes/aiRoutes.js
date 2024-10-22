const express = require('express');
const { HfInference } = require('@huggingface/inference');
require('dotenv').config(); // For loading environment variables

const router = express.Router();
const hf = new HfInference('access_token');


// Route for summarization
router.post('/summarize', async (req, res) => {
    console.log(hf);
    const { text } = req.body;
    try {
        const result = await hf.summarization({
            model: 'facebook/bart-large-cnn',
            inputs: text,
        });
        console.log(result);
        res.json({ summary: result.summary_text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error summarizing text' });
    }
});

// Route for blog creation
router.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    try {
        const result = await hf.textGeneration({
            model: 'EleutherAI/gpt-neo-2.7B', // More powerful model
            inputs: prompt,
            parameters: { 
                max_new_tokens: 100, // Adjust to control the length of the response
                temperature: Math.random(), // Add randomness to avoid repetition
                top_k: 50, // Consider only the top 50 tokens
                top_p: 0.9 // Nucleus sampling to improve diversity
            },
            options: { timeout: 120000 } // Extend timeout if needed
        });

        console.log(result.generated_text);
        res.json({ blogPost: result.generated_text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating text' });
    }
});

module.exports = router;
