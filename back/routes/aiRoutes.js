const express = require('express');
const { HfInference } = require('@huggingface/inference');
require('dotenv').config(); // For loading environment variables

const router = express.Router();
const hf = new HfInference(process.env.HF_API_KEY);


// Route for summarization
router.post('/summarize', async (req, res) => {
    console.log(hf);
    const { text } = req.body;
    try {
        const result = await hf.request({
            model: 'facebook/bart-large-cnn',
            inputs: text,
        });
        console.log(result);

        // Assuming the result contains an array of summaries, we extract the first one
        const summary = result[0]?.summary_text || 'No summary available';
        
        res.json({ summary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error summarizing text' });
    }
});


// Route for blog creation
router.post('/generate', async (req, res) => {
    console.log(hf);
    const { prompt } = req.body;
    try {
        const result = await hf.textGeneration({
            model: 'meta-llama/Llama-3.2-3B-Instruct', // More powerful model
            inputs: prompt,
            parameters: { 
                max_new_tokens: 1000, // Adjust to control the length of the response
                temperature: Math.random(), // Add randomness to avoid repetition
                top_k: 1000, // Consider only the top 50 tokens
                top_p: 0.9 // Nucleus sampling to improve diversity
            },
            options: { timeout: 180000 } // Extend timeout if needed
        });

        console.log(result.generated_text);
        res.json({ blogPost: result.generated_text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating text' });
    }
});

module.exports = router;
