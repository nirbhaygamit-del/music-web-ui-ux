// Data for each era/soundtrack of your life
const eras = [
    {
        id: 0,
        year: "2018 - 2020",
        tag: "Chapter 01 // Roots",
        title: "The Lo-Fi Genesis",
        description: "Started coding late at night fueled by coffee and ambient instrumental loops. This era was all about learning fundamentals, building clumsy static pages, and falling in love with the problem-solving craft.",
        trackName: "Late Night Lo-Fi",
        color: "#ec4899", // Pink Glow
        bgColor: "#0b0f19",
        audioSrc: "https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg" 
    },
    {
        id: 1,
        year: "2021 - 2023",
        tag: "Chapter 02 // Momentum",
        title: "Synthwave Scale",
        description: "Stepped into professional frontend engineering. Fast-paced modern frameworks, collaborating with global teams, and shipping applications used by thousands daily. High energy, high synth.",
        trackName: "Neon Highway",
        color: "#3b82f6", // Blue Glow
        bgColor: "#090d16",
        audioSrc: "https://actions.google.com/sounds/v1/science_fiction/teleportation.ogg"
    },
    {
        id: 2,
        year: "2024 - Present",
        tag: "Chapter 03 // Horizon",
        title: "Ambient Architecture",
        description: "Focusing on deep design systems, creative UI/UX, and generative interfaces. Bridging the gap between robust software engineering and exquisite sensory experiences.",
        trackName: "Deep Focus Flow",
        color: "#10b981", // Emerald Glow
        bgColor: "#07110e",
        audioSrc: "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg"
    }
];

let currentEraIndex = 0;
let isPlaying = false;

// DOM Elements
const eraTag = document.getElementById('eraTag');
const eraTitle = document.getElementById('eraTitle');
const eraDescription = document.getElementById('eraDescription');
const playlistContainer = document.getElementById('playlist');
const vinylRecord = document.getElementById('vinylRecord');
const tonearm = document.getElementById('tonearm');
const labelTrackNo = document.getElementById('labelTrackNo');
const labelYear = document.getElementById('labelYear');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const tickerTitle = document.getElementById('tickerTitle');
const audioPlayer = document.getElementById('audioPlayer');
const body = document.body;

// Initialize Playlist UI
function renderPlaylist() {
    playlistContainer.innerHTML = '';
    eras.forEach((era, index) => {
        const item = document.createElement('div');
        item.className = `playlist-item ${index === currentEraIndex ? 'active' : ''}`;
        item.innerHTML = `
            <div class="track-info-small">
                <h4>${era.title}</h4>
                <span>${era.year} • ${era.trackName}</span>
            </div>
            <div class="play-icon">${index === currentEraIndex && isPlaying ? '♫' : '▸'}</div>
        `;
        item.addEventListener('click', () => {
            currentEraIndex = index;
            updateEra(true); // Auto play on selection switch
        });
        playlistContainer.appendChild(item);
    });
}

// Update UI based on current era
function updateEra(autoplay = false) {
    const era = eras[currentEraIndex];
    
    eraTag.textContent = era.tag;
    eraTitle.textContent = era.title;
    eraDescription.textContent = era.description;
    labelTrackNo.textContent = `TRK 0${era.id + 1}`;
    labelYear.textContent = era.year.split(' ')[0];
    tickerTitle.textContent = era.trackName;

    // Set color variables
    document.documentElement.style.setProperty('--accent', era.color);
    document.documentElement.style.setProperty('--accent-glow', era.color + '66');
    body.style.backgroundColor = era.bgColor;

    audioPlayer.src = era.audioSrc;

    renderPlaylist();

    if (autoplay) {
        playAudio();
    } else {
        pauseAudio();
    }
}

function playAudio() {
    isPlaying = true;
    audioPlayer.play().catch(e => console.log("Audio autoplay prevented by browser policy:", e));
    vinylRecord.classList.add('spinning');
    tonearm.classList.add('active');
    playPauseBtn.textContent = '⏸';
    statusDot.classList.add('playing');
    statusText.textContent = 'Now Playing';
    renderPlaylist();
}

function pauseAudio() {
    isPlaying = false;
    audioPlayer.pause();
    vinylRecord.classList.remove('spinning');
    tonearm.classList.remove('active');
    playPauseBtn.textContent = '▶';
    statusDot.classList.remove('playing');
    statusText.textContent = 'Paused';
    renderPlaylist();
}

// Event Listeners
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
});

nextBtn.addEventListener('click', () => {
    currentEraIndex = (currentEraIndex + 1) % eras.length;
    updateEra(isPlaying);
});

prevBtn.addEventListener('click', () => {
    currentEraIndex = (currentEraIndex - 1 + eras.length) % eras.length;
    updateEra(isPlaying);
});

// Initialize on load
renderPlaylist();
updateEra(false);