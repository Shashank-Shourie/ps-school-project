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
    const { prompt, userId } = req.body;

    try {
        // Find the user's conversation history
        let chat = await History.findOne({ by: userId });

        // If no history exists, create a new one
        if (!chat) {
            chat = await History.create({ by: userId, inputs: [], outputs: [] });
        }

        // Combine previous inputs and outputs for context
        const context = chat.inputs
            .map((input, idx) => `User: ${input}\nAI: ${chat.outputs[idx] || ''}`)
            .join('\n') + `\nUser: ${prompt}\n`;

        console.log(context);
        console.log("++++++++++");
        // Call the Hugging Face model with the conversation context
        const result = await hf.textGeneration({
            model: 'meta-llama/Llama-3.2-3B-Instruct',
            inputs: context,
            parameters: { 
                // max_new_tokens: 1000,
                temperature: Math.random(),
                top_k: 1000,
                top_p: 0.9
            },
            options: { timeout: 180000 }
        });

        // Extract the AI's response
        const aiResponse = result.generated_text;

        // Update the history with the new prompt and response
        chat.inputs.push(prompt);
        chat.outputs.push(aiResponse);
        await chat.save();

        console.log(aiResponse);
        res.json({ blogPost: aiResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating text' });
    }
});


module.exports = router;
