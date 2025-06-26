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
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        youtubeId: '4NRXx6U8ABQ', // Example ID, replace with actual
        duration: 230
    },
    {
        id: 'v2',
        title: 'Gods Plan',
        artist: 'Drake',
        youtubeId: 'xpVfcZ0ZcFM',
        duration: 198
    },
    {
        id: 'v3',
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        youtubeId: 'JGwWNGJdvx8',
        duration: 233
    },
    {
        id: 'v4',
        title: 'Uptown Funk',
        artist: 'Mark Ronson ft. Bruno Mars',
        youtubeId: 'OPf0YbXqDm0',
        duration: 271
    },
    {
        id: 'v5',
        title: 'Despacito',
        artist: 'Luis Fonsi ft. Daddy Yankee',
        youtubeId: 'kJQP7kA_zcs',
        duration: 279
    }
];

module.exports = {
    audioPlaylist,
    videoPlaylist
};
