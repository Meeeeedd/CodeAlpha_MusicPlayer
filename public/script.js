// --- Music Player State Variables ---
let playlist = []; // Stores the fetched audio playlist
let videoPlaylist = []; // Stores the fetched video playlist
let currentSongIndex = 0; // Index of the currently playing audio song
let currentVideoIndex = 0; // Index of the currently playing video
let isPlaying = false; // Tracks if audio music is currently playing
let isAutoplay = true; // Controls if the next audio song plays automatically
let activeView = 'audio'; // Tracks the active view: 'audio' or 'video'
let currentTheme = 'dark'; // Tracks the current theme: 'dark' or 'light' (initialized based on localStorage)

// --- DOM Element References ---
const audio = document.getElementById('audio-source'); // The HTML <audio> element
const playPauseBtn = document.getElementById('play-pause-btn'); // The play/pause button
const playPauseIcon = document.getElementById('play-pause-icon'); // The icon inside the play/pause button
const prevBtn = document.getElementById('prev-btn'); // Previous song button
const nextBtn = document.getElementById('next-btn'); // Next song button
const songTitleEl = document.getElementById('song-title'); // Audio song title display
const artistNameEl = document.getElementById('artist-name'); // Audio artist name display
const albumArtEl = document.getElementById('album-art'); // Album art display
const progressBar = document.getElementById('progress-bar'); // Song progress slider
const currentTimeEl = document.getElementById('current-time'); // Current time display
const durationEl = document.getElementById('duration'); // Total duration display
const volumeSlider = document.getElementById('volume-slider'); // Volume control slider
const audioPlaylistEl = document.getElementById('playlist'); // Audio playlist container

// --- Navigation Elements ---
const audioNavBtn = document.getElementById('audio-nav-btn');
const videoNavBtn = document.getElementById('video-nav-btn');
const audioPlayerSection = document.getElementById('audio-player-section');
const audioPlaylistSection = document.getElementById('audio-playlist-section');
const videoPlayerSection = document.getElementById('video-player-section');
const videoPlaylistEl = document.getElementById('video-playlist');
const youtubePlayerContainer = document.getElementById('youtube-player-container');
const videoInfoEl = document.getElementById('video-info');

// --- Gemini Feature Modal Elements ---
const artistInfoBtn = document.getElementById('artist-info-btn'); // Button to get artist insights
const infoModal = document.getElementById('info-modal'); // The modal container
const modalTitle = document.getElementById('modal-title'); // Modal title
const modalContent = document.getElementById('modal-content'); // Modal content area
const closeModalBtn = document.getElementById('close-modal-btn'); // Button to close the modal

// --- Theme Toggle Elements ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// --- Helper Function: Format Time (e.g., 1:05) ---
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// --- Theme Management Functions ---

/**
 * Applies the specified theme to the document.
 * @param {string} theme - 'dark' or 'light'.
 */
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        currentTheme = 'light';
    } else {
        document.body.classList.remove('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        currentTheme = 'dark';
    }
    localStorage.setItem('musicPlayerTheme', currentTheme);
}

/**
 * Toggles the current theme between dark and light.
 */
function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// --- View Switching Functions ---

/**
 * Activates the audio player view.
 */
function showAudioPlayer() {
    activeView = 'audio';
    audioPlayerSection.classList.remove('hidden');
    audioPlaylistSection.classList.remove('hidden');
    videoPlayerSection.classList.add('hidden');
    audioNavBtn.classList.add('active');
    videoNavBtn.classList.remove('active');
    pauseSong(); // Pause audio if switching away from video
    // Clear YouTube iframe content to stop any playing video
    youtubePlayerContainer.innerHTML = `
        <div class="youtube-placeholder w-full h-full flex items-center justify-center bg-var(--alt-card-bg)">
            <i class="fab fa-youtube fa-4x text-red-500"></i>
            <span class="ml-4 text-xl text-var(--text-secondary)">No Video Selected</span>
        </div>
    `;
    videoInfoEl.textContent = 'Select a video from the playlist below.';
}

/**
 * Activates the video player view.
 */
function showVideoPlayer() {
    activeView = 'video';
    audioPlayerSection.classList.add('hidden');
    audioPlaylistSection.classList.add('hidden');
    videoPlayerSection.classList.remove('hidden');
    audioNavBtn.classList.remove('active');
    videoNavBtn.classList.add('active');
    pauseSong(); // Pause audio when switching to video
    if (videoPlaylist.length === 0) {
        fetchVideoPlaylist(); // Fetch video playlist if not already loaded
    } else {
        loadVideo(currentVideoIndex); // Load current video if playlist exists
    }
}


// --- Core Music Player Functions (Audio) ---

/**
 * Fetches the audio playlist from the backend server.
 */
async function fetchAudioPlaylist() {
    try {
        const response = await fetch('/api/playlist');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        playlist = await response.json();
        if (playlist.length > 0) {
            buildAudioPlaylistUI();
            loadSong(currentSongIndex);
        } else {
            songTitleEl.textContent = 'No songs in playlist';
            artistNameEl.textContent = '';
            albumArtEl.src = 'https://placehold.co/600x600/1f2937/ffffff?text=No+Music';
        }
    } catch (error) {
        console.error('Failed to fetch audio playlist:', error);
        songTitleEl.textContent = 'Error loading playlist';
        artistNameEl.textContent = 'Please try again later';
        albumArtEl.src = 'https://placehold.co/600x600/1f2937/ffffff?text=Error';
    }
}

/**
 * Loads an audio song into the player.
 * @param {number} index - The index of the song to load.
 */
function loadSong(index) {
    if (!playlist.length || index < 0 || index >= playlist.length) {
        console.warn('Attempted to load an invalid song index or empty audio playlist.');
        return;
    }
    const song = playlist[index];
    audio.src = song.url;
    songTitleEl.textContent = song.title;
    artistNameEl.textContent = song.artist;
    albumArtEl.src = song.albumArt || 'https://placehold.co/600x600/1f2937/ffffff?text=Music';
    highlightAudioPlaylist(index);
}

/**
 * Plays the current audio song.
 */
function playSong() {
    audio.play().catch(e => console.error("Error playing audio:", e));
    isPlaying = true;
    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');
}

/**
 * Pauses the current audio song.
 */
function pauseSong() {
    audio.pause();
    isPlaying = false;
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
}

/**
 * Toggles play/pause state for audio.
 */
function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

/**
 * Plays the previous audio song.
 */
function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
}

/**
 * Plays the next audio song.
 */
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
}

/**
 * Updates the audio progress bar and time displays.
 */
function updateProgressBar() {
    if (audio.duration) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        if (durationEl.textContent === '0:00' || isNaN(audio.duration)) {
             durationEl.textContent = formatTime(audio.duration);
        }
        // Update the custom CSS property for the progress bar fill
        progressBar.style.setProperty('--track-fill', `${progressBar.value}%`);
    } else {
        progressBar.value = 0;
        currentTimeEl.textContent = '0:00';
        durationEl.textContent = '0:00';
        progressBar.style.setProperty('--track-fill', '0%');
    }
}

/**
 * Sets the current audio song time based on progress bar.
 */
function setProgress(event) {
    const newTime = (event.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
}

/**
 * Sets the audio volume.
 */
function setVolume(event) {
    audio.volume = event.target.value;
    // Update the custom CSS property for the volume slider fill
    volumeSlider.style.setProperty('--track-fill', `${volumeSlider.value * 100}%`);
}

/**
 * Populates the audio playlist UI.
 */
function buildAudioPlaylistUI() {
    audioPlaylistEl.innerHTML = ''; // Clear existing list
    playlist.forEach((song, index) => {
        const listItem = document.createElement('li');
        // Ensure text color classes reference CSS variables directly on inner elements for robustness
        listItem.classList.add('flex', 'justify-between', 'items-center', 'cursor-pointer', 'p-2', 'rounded-md', 'hover:bg-var(--hover-bg)', 'transition', 'duration-200');
        listItem.innerHTML = `
            <div>
                <div class="text-sm font-medium text-var(--text-primary)">${song.title}</div>
                <div class="text-xs text-var(--text-secondary)">${song.artist}</div>
            </div>
            <div class="text-xs text-var(--text-secondary)">${song.duration ? formatTime(song.duration) : '0:00'}</div>
        `;
        listItem.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        audioPlaylistEl.appendChild(listItem);
    });
}

/**
 * Highlights the currently playing audio song in the playlist UI.
 */
function highlightAudioPlaylist(index) {
    Array.from(audioPlaylistEl.children).forEach((listItem, idx) => {
        listItem.classList.toggle('active', idx === index);
    });
}


// --- Core Video Player Functions ---

/**
 * Fetches the video playlist from the backend server.
 */
async function fetchVideoPlaylist() {
    try {
        const response = await fetch('/api/videoplaylist'); // New API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        videoPlaylist = await response.json();
        if (videoPlaylist.length > 0) {
            buildVideoPlaylistUI();
            loadVideo(currentVideoIndex); // Load the first video
        } else {
            videoInfoEl.textContent = 'No videos in playlist.';
            youtubePlayerContainer.innerHTML = `
                <div class="youtube-placeholder w-full h-full flex items-center justify-center bg-var(--alt-card-bg)">
                    <i class="fab fa-youtube fa-4x text-red-500"></i>
                    <span class="ml-4 text-xl text-var(--text-secondary)">No Video Selected</span>
                </div>
            `;
        }
    } catch (error) {
        console.error('Failed to fetch video playlist:', error);
        videoInfoEl.textContent = 'Error loading video playlist.';
        youtubePlayerContainer.innerHTML = `
            <div class="youtube-placeholder w-full h-full flex items-center justify-center bg-var(--alt-card-bg)">
                <i class="fas fa-exclamation-triangle fa-4x text-red-400"></i>
                <span class="ml-4 text-xl text-red-400">Error Loading Videos</span>
            </div>
        `;
    }
}

/**
 * Loads a YouTube video into the iframe.
 * @param {number} index - The index of the video to load.
 */
function loadVideo(index) {
    if (!videoPlaylist.length || index < 0 || index >= videoPlaylist.length) {
        console.warn('Attempted to load an invalid video index or empty video playlist.');
        videoInfoEl.textContent = 'No video selected or available.';
        youtubePlayerContainer.innerHTML = `
            <div class="youtube-placeholder w-full h-full flex items-center justify-center bg-var(--alt-card-bg)">
                <i class="fab fa-youtube fa-4x text-red-500"></i>
                <span class="ml-4 text-xl text-var(--text-secondary)">No Video Selected</span>
            </div>
        `;
        return;
    }
    const video = videoPlaylist[index];
    videoInfoEl.textContent = `${video.title} - ${video.artist}`;
    youtubePlayerContainer.innerHTML = `
        <iframe
            class="w-full h-full"
            src="https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
    `;
    highlightVideoPlaylist(index);
    currentVideoIndex = index; // Update current video index
}

/**
 * Populates the video playlist UI.
 */
function buildVideoPlaylistUI() {
    videoPlaylistEl.innerHTML = '';
    videoPlaylist.forEach((video, index) => {
        const listItem = document.createElement('li');
        // Ensure text color classes reference CSS variables directly on inner elements for robustness
        listItem.classList.add('flex', 'justify-between', 'items-center', 'cursor-pointer', 'p-2', 'rounded-md', 'hover:bg-var(--hover-bg)', 'transition', 'duration-200');
        listItem.innerHTML = `
            <div>
                <div class="text-sm font-medium text-var(--text-primary)">${video.title}</div>
                <div class="text-xs text-var(--text-secondary)">${video.artist}</div>
            </div>
            ${video.duration ? `<div class="text-xs text-var(--text-secondary)">${formatTime(video.duration)}</div>` : ''}
        `;
        listItem.addEventListener('click', () => {
            loadVideo(index);
        });
        videoPlaylistEl.appendChild(listItem);
    });
}

/**
 * Highlights the currently playing video in the playlist UI.
 */
function highlightVideoPlaylist(index) {
    Array.from(videoPlaylistEl.children).forEach((listItem, idx) => {
        listItem.classList.toggle('active', idx === index);
    });
}

// --- Gemini Artist Insights Feature ---

/**
 * Shows the modal with a loading spinner.
 */
function showModalWithLoading() {
    infoModal.classList.remove('invisible', 'opacity-0'); // Make visible and opaque
    infoModal.classList.add('show'); // Trigger CSS transition for content
    modalContent.innerHTML = '<div class="loader"></div><p class="text-center text-var(--text-secondary) mt-4">Getting insights...</p>';
    modalTitle.textContent = 'Artist Insights';
}

/**
 * Hides the modal.
 */
function hideModal() {
    infoModal.classList.remove('show'); // Remove show class to trigger reverse transition
    // Wait for transition to complete before hiding completely
    setTimeout(() => {
        infoModal.classList.add('invisible', 'opacity-0');
        modalContent.innerHTML = ''; // Clear content after hiding
    }, 300); // Match CSS transition duration
}

/**
 * Fetches artist insights from the backend's Gemini proxy.
 */
async function getArtistInsights() {
    const artistName = artistNameEl.textContent; // Use artist from audio player context
    if (!artistName || artistName === 'Artist Name' || artistName === 'Error loading playlist') {
        showModalWithLoading(); // Still show modal for feedback
        modalContent.innerHTML = '<p class="text-red-400 text-center">Cannot get insights: No artist selected or artist name is generic.</p>';
        return;
    }

    showModalWithLoading(); // Show modal with spinner

    try {
        const response = await fetch('/api/artist-insight', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ artist: artistName }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.text) {
            modalContent.innerHTML = `<p class="text-var(--text-primary)">${data.text.replace(/\n/g, '<br>')}</p>`;
        } else {
            modalContent.innerHTML = '<p class="text-red-400">Failed to get artist insights. Please try again.</p>';
        }
    } catch (error) {
        console.error('Error fetching artist insights:', error);
        modalContent.innerHTML = `<p class="text-red-400">Error: Could not fetch insights. ${error.message}</p>`;
    }
}

// --- Event Listeners ---

// Theme toggle button
themeToggleBtn.addEventListener('click', toggleTheme);

// Navigation buttons
audioNavBtn.addEventListener('click', showAudioPlayer);
videoNavBtn.addEventListener('click', showVideoPlayer);

// Audio Player Controls
playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', playPreviousSong);
nextBtn.addEventListener('click', playNextSong);
progressBar.addEventListener('input', setProgress);
volumeSlider.addEventListener('input', setVolume);
audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('loadedmetadata', updateProgressBar);
audio.addEventListener('ended', () => {
    if (isAutoplay) {
        playNextSong();
    } else {
        pauseSong();
    }
});

// Artist info button (Gemini modal)
artistInfoBtn.addEventListener('click', getArtistInsights);
closeModalBtn.addEventListener('click', hideModal);
infoModal.addEventListener('click', (e) => {
    // Only close if clicking on the overlay, not the modal content itself
    if (e.target === infoModal) {
        hideModal();
    }
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme on load, default to dark
    const savedTheme = localStorage.getItem('musicPlayerTheme') || 'dark';
    applyTheme(savedTheme);

    fetchAudioPlaylist(); // Fetch the audio playlist initially
    audio.volume = volumeSlider.value; // Set initial volume from slider
    // Initialize the custom CSS property for the volume slider fill
    volumeSlider.style.setProperty('--track-fill', `${volumeSlider.value * 100}%`);
    showAudioPlayer(); // Ensure audio player is shown by default
});
