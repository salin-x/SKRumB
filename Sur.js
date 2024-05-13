// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let pausedTime = 0; // Initialize a variable to store the paused time

let songs = [
    {
        filePath: 'songs 4/29.mp3',
        songName: 'Anti Hero - Taylor Swift',
        coverPath: 'covers 4/anti hero.png'
    },
    {
        filePath: 'songs 4/30.mp3',
        songName: 'Cruel Summer - Taylor Swift',
        coverPath: 'covers 4/lover.png'
    },
    {
        filePath: 'songs 4/31.mp3',
        songName: 'I forgot that you existed - Taylor Swift',
        coverPath: 'covers 4/lover.png'
    },
    {
        filePath: 'songs 4/32.mp3',
        songName: 'London Boy - Taylor Swift',
        coverPath: 'covers 4/lover.png'
    },
    {
        filePath: 'songs 4/33.mp3',
        songName: 'Lover - Taylor Swift',
        coverPath: 'covers 4/lover.png'
    },
    {
        filePath: 'songs 4/34.mp3',
        songName: 'Paper Rings - Taylor Swift',
        coverPath: 'covers 4/lover.png'
    },
    {
        filePath: 'songs 4/35.mp3',
        songName: 'The Man - Taylor Swift',
        coverPath: 'covers 4/lover.png'
    },
    {
        filePath: 'songs 4/36.mp3',
        songName: 'You need to calm down - Taylor Swift',
        coverPath: 'covers 4/lover.png'
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
