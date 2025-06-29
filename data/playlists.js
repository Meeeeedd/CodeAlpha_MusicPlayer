// data/playlists.js

// --- Audio Playlist Data ---
const audioPlaylist = [
    {
        id: '1',
        title: 'Eternal Horizons',
        artist: 'Cosmic Soundscapes',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        albumArt: 'https://placehold.co/600x600/FF00FF/FFFFFF?text=Song1',
        duration: 180
    },
    {
        id: '2',
        title: 'Whispering Winds',
        artist: 'Nature\'s Melodies',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        albumArt: 'https://placehold.co/600x600/00FFFF/FFFFFF?text=Song2',
        duration: 210
    },
    {
        id: '3',
        title: 'City Lights',
        artist: 'Urban Rhythms',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        albumArt: 'https://placehold.co/600x600/FFFF00/000000?text=Song3',
        duration: 240
    },
    {
        id: '4',
        title: 'Deep Space Journey',
        artist: 'Astro Beats',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        albumArt: 'https://placehold.co/600x600/FFD700/000000?text=Song4',
        duration: 195
    },
    {
        id: '5',
        title: 'Rainy Day Blues',
        artist: 'Melancholy Tunes',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        albumArt: 'https://placehold.co/600x600/800080/FFFFFF?text=Song5',
        duration: 225
    },
    {
        id: '6',
        title: 'Timeless',
        artist: 'The Weeknd, Playboi Carti',
        url: '/songs/Timeless-TheWeeknd,PlayboiCarti(Slowed+Reverb).mp3',
        albumArt: 'https://filtermexico.com/wp-content/uploads/2024/09/timelesss.jpg',
        duration: 295
    },
];

// --- Video Playlist Data (YouTube) ---
const videoPlaylist = [
    {
        id: 'v1',
        title: 'Maktoub',
        artist: 'A.L.A',
        youtubeId: 'Og_bA70eKvk', // Corrected: Just the video ID
        duration: 230
    },
    {
        id: 'v2',
        title: '7 Snin',
        artist: 'Samara',
        youtubeId: 'NvCmx1KjLc8', // Corrected: Just the video ID
        duration: 300
    },
    {
        id: 'v3',
        title: 'Dernier But',
        artist: 'Samara',
        youtubeId: 'v7QJlY_WRBs', // Corrected: Just the video ID
        duration: 233
    },
    {
        id: 'v4',
        title: 'Nsitou Li Nseni',
        artist: 'Samara',
        youtubeId: 'cq5EnKIIpxk', // Corrected: Just the video ID
        duration: 325
    }
];

module.exports = {
    audioPlaylist,
    videoPlaylist
};
