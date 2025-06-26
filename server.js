// server.js - Backend for Music Player

// --- Module Imports ---
const express = require('express');
const dotenv = require('dotenv'); // For loading environment variables from .env file
const helmet = require('helmet'); // For setting security-related HTTP headers
const cors = require('cors'); // For enabling Cross-Origin Resource Sharing
const path = require('path'); // For working with file and directory paths

// Import playlist data from a separate file
const { audioPlaylist, videoPlaylist } = require('./data/playlists');

// --- Load Environment Variables ---
dotenv.config();

// --- Server Initialization ---
const app = express();
const port = process.env.PORT || 3000; // Use port from environment or default to 3000

// --- Middleware Setup ---
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded requests

// Helmet helps secure Express apps by setting various HTTP headers.
app.use(helmet({
    contentSecurityPolicy: false, // For development, consider configuring for production
}));

// CORS setup: Allows requests from any origin. For production,
// restrict this to your specific frontend domain.
app.use(cors());

// --- Serve Static Files ---
// All files in the 'public' directory will be served directly.
app.use(express.static(path.join(__dirname, 'public')));

// --- API Endpoints ---

/**
 * GET /api/playlist
 * Returns the list of audio songs.
 */
app.get('/api/playlist', (req, res) => {
    console.log('Audio playlist requested.');
    res.json(audioPlaylist);
});

/**
 * GET /api/videoplaylist
 * Returns the list of video clips.
 */
app.get('/api/videoplaylist', (req, res) => {
    console.log('Video playlist requested.');
    res.json(videoPlaylist);
});

/**
 * POST /api/artist-insight
 * Proxies requests to the Gemini API to get insights about an artist.
 * The API key is kept secure on the server side.
 */
app.post('/api/artist-insight', async (req, res) => {
    // Dynamically import node-fetch here
    const { default: fetch } = await import('node-fetch');

    const artistName = req.body.artist;
    if (!artistName) {
        return res.status(400).json({ error: 'Artist name is required.' });
    }

    // Ensure GEMINI_API_KEY is set in your .env file
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        console.error('GEMINI_API_KEY is not set in .env file!');
        return res.status(500).json({ error: 'Server API key not configured.' });
    }

    const prompt = `Provide a concise and interesting paragraph about the musical artist "${artistName}". Focus on their genre, notable works, and impact.`;

    try {
        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        };

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

        const geminiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const geminiResult = await geminiResponse.json();

        if (geminiResult.candidates && geminiResult.candidates.length > 0 &&
            geminiResult.candidates[0].content && geminiResult.candidates[0].content.parts &&
            geminiResult.candidates[0].content.parts.length > 0) {
            const text = geminiResult.candidates[0].content.parts[0].text;
            res.json({ text: text });
        } else {
            console.error('Unexpected Gemini API response structure:', geminiResult);
            res.status(500).json({ error: 'Failed to get insights from AI. Unexpected response.' });
        }

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: `Failed to get insights. ${error.message}` });
    }
});


// --- Server Start ---
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Music Player frontend available at http://localhost:${port}/index.html`);
});
