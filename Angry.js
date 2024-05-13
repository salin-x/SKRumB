// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {
        filePath: 'songs 1/1.mp3',
        songName: 'Taki Taki - DJ Snake',
        coverPath: 'covers 1/taki taki .png'
    },
    {
        filePath: 'songs 1/2.mp3',
        songName: 'Sweet Dreams - Eurythmics',
        coverPath: 'covers 1/sweet dreams.png'
    },
    {
        filePath: 'songs 1/3.mp3',
        songName: 'Goosebumps - HVME',
        coverPath: 'covers 1/hvme.png'
    },
    {
        filePath: 'songs 1/4.mp3',
        songName: 'Whatever it takes - Imagine Dragons',
        coverPath: 'covers 1/whatever it takes.png'
    },
    {
        filePath: 'songs 1/5.mp3',
        songName: 'Cant hold us - Macklemore',
        coverPath: 'covers 1/cant hold us.png'
    },
    {
        filePath: 'songs 1/6.mp3',
        songName: 'Mi Gente - J Balvin',
        coverPath: 'covers 1/j balvin.png'
    },
    {
        filePath: 'songs 1/7.mp3',
        songName: 'Unstoppable - Sia',
        coverPath: 'covers 1/sia .png'
    },
    {
        filePath: 'songs 1/8.mp3',
        songName: 'Unstoppable - The Score',
        coverPath: 'covers 1/the score.png'
    },
    {
        filePath: 'songs 1/9.mp3',
        songName: 'Blinding Lights - The Weeknd',
        coverPath: 'covers 1/blinding lights.png'
    },
    {
        filePath: 'songs 1/10.mp3',
        songName: 'Titanium - Sia',
        coverPath: 'covers 1/titanium.png'
    },
    
];

const playNextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong();
};

const playPreviousSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong();
};

// Function to play a specific song
const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
};

// Function to update the play/pause button icon
const updatePlayPauseButton = () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        // If audio is paused or has never started playing
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    } else {
        // If audio is currently playing
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
};

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        // If audio is paused or has never started playing
        if (pausedTime !== 0) {
            // If there's a paused time stored, resume from there
            audioElement.currentTime = pausedTime;
            audioElement.play(); // Start playing
            pausedTime = 0; // Reset paused time after resuming playback
        } else {
            playSong(); // If no paused time, play from the beginning
        }
    } else {
        // If audio is currently playing, pause it
        audioElement.pause();
        // Store the current time as the paused time
        pausedTime = audioElement.currentTime;
    }
    // Update the play/pause button icon after toggling playback state
    updatePlayPauseButton();
});

// Update the play/pause button icon initially
updatePlayPauseButton();
// Listen to the 'ended' event for playing the next song
audioElement.addEventListener('ended', playNextSong);

// ... (your existing event listeners)

// Function to initialize song items
const initializeSongItems = () => {
    songItems.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
        element.getElementsByClassName("songItemPlay")[0].addEventListener('click', (e) => {
            makeAllPlays();
            songIndex = i;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            playSong();
        });
    });
};

// Function to make all plays inactive
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Function to update the progress bar/slider position as the audio plays
const updateProgressBar = () => {
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;
    const progressBar = (currentTime / duration) * 100;
    myProgressBar.value = progressBar;
};

// Listen to the 'timeupdate' event to update the progress bar/slider position
audioElement.addEventListener('timeupdate', updateProgressBar);

// Function to handle clicking on the previous button
document.getElementById('previous').addEventListener('click', playPreviousSong);

// Function to handle clicking on the next button
document.getElementById('next').addEventListener('click', playNextSong);

// Initialize song items
initializeSongItems();
