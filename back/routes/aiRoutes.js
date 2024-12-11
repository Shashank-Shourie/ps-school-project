const express = require('express');
const { HfInference } = require('@huggingface/inference');
require('dotenv').config(); // For loading environment variables


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
    const {prompt} = req.body;
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
        const aiblog = {
            title:prompt,
            content:result.generated_text,
            tags:['#ai']
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating text' });
    }
});

router.post('/generate-image', async (req, res) => {
    const { blogContent } = req.body;
    try {
        const result = await hf.textToImage({
            model: 'CompVis/stable-diffusion-v1-4',
            inputs: blogContent,
            parameters: { width: 512, height: 512, num_inference_steps: 50 },
        });

        console.log("Image generation result:", result);

        if (result instanceof Blob) {
            // Convert the Blob to a base64 string
            const buffer = await result.arrayBuffer();
            const base64Image = Buffer.from(buffer).toString('base64');
            const imageUrl = `data:image/jpeg;base64,${base64Image}`;

            res.json({ imageUrl });
        } else {
            res.status(500).json({ error: 'Unexpected response format' });
        }
    } catch (error) {
        console.error("Error during image generation:", error);
        res.status(500).json({ error: 'Error generating image' });
    }
});

module.exports = router;
