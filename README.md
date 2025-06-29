Secure Music Player Application
This is a simple music player application built with HTML, CSS (Tailwind CSS for utility, custom CSS for specifics), JavaScript, and a Node.js/Express backend. It features basic music controls, playlist management, and integrates with the Gemini API to provide artist insights, demonstrating a more secure way to handle API keys by proxying requests through the backend.

GitHub Repository: https://github.com/Meeeeedd/CodeAlpha_MusicPlayer.git

Project Structure
Music_Player/
│
├── public/
│   ├── index.html          # Main music player interface
│   ├── style.css           # Custom CSS for specific elements (e.g., scrollbars, range sliders)
│   └── script.js           # JavaScript for player logic and API interactions
├── server.js               # Node.js Express backend server
├── .env                    # Environment variables (e.g., Gemini API Key) - **DO NOT COMMIT THIS FILE**
└── README.md               # This README file

Features
Music Playback: Play, pause, next, previous song functionality.

Song Information: Displays song title, artist, and duration.

Progress & Volume Control: Interactive sliders for tracking progress and adjusting volume.

Dynamic Volume Icons: The volume icon intelligently changes to indicate mute, low, or high volume levels based on the slider position.

Shuffle Mode: Toggle shuffle on/off to play songs from your audio playlist in a random order. The shuffle button provides visual feedback when active.

Dynamic Playlist: Loads playlist data from the backend and highlights the currently playing song.

Autoplay: Automatically plays the next song when the current one ends.

Video Player:

View Toggle: Seamlessly switch between the audio player and a dedicated video player interface.

YouTube Integration: Embeds and plays YouTube video clips directly.

Video Navigation: Play the next or previous video in the playlist.

Video Playlist: Browse and select video clips from a detailed list, showing thumbnails, titles, and artists. The active video is highlighted. The video player height is adjusted for better visibility.

Artist Insights (Gemini API Integration):

Click a button to get a concise overview of the current artist using the Gemini API.

API key is securely stored and used on the backend (server.js), protecting it from client-side exposure.

Responsive Design: Utilizes Tailwind CSS for a fluid and mobile-friendly interface, ensuring content adapts across different screen sizes.

Theme Toggle: Switch between a Dark Mode and a Light Mode with smooth transitions. Your preferred theme is saved locally.

Basic Security: Uses helmet middleware for basic HTTP header security.

Setup and Installation
Prerequisites
Node.js (LTS version recommended)

npm (Node Package Manager, comes with Node.js)

A Gemini API Key (get one from Google AI Studio)

Steps
Clone or Download the Project:
If you're starting from scratch, create a new folder named Music_Player and place the public/, server.js, .env, and README.md files inside it according to the structure above.

Navigate to the Project Directory:
Open your terminal or command prompt and go into the Music_Player folder:

cd Music_Player

Install Dependencies:
Install the necessary Node.js packages (express, dotenv, helmet, cors, node-fetch):

npm install express dotenv helmet cors node-fetch

Configure Environment Variables:
Create a file named .env in the root of your Music_Player directory (at the same level as server.js).
Add your Gemini API key and desired port to this file:

GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
PORT=3000

Replace YOUR_GEMINI_API_KEY_HERE with your actual Gemini API key.

Security Note: The .env file should never be committed to version control (e.g., Git). Add .env to your .gitignore file if you are using Git.

Run the Server:
Start the Node.js Express server:

node server.js

You should see output similar to:

Server running at http://localhost:3000
Music Player frontend available at http://localhost:3000/index.html

Access the Application:
Open your web browser and navigate to http://localhost:3000/index.html.