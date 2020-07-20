const music = document.querySelector('audio')
const title = document.querySelector('#title')
const progressContainer = document.querySelector('#progress-container')
const progress = document.querySelector('#progress')
const currentTimeEl = document.querySelector('#current-time')
const durationEl = document.querySelector('#duration')
const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')

const songs = [
  {
    name: 'caverns',
    displayName: 'Caverns of Insipid Reflection',
  },
  {
    name: 'relinquish',
    displayName: 'Relinquish The Self',
  },
  {
    name: 'ectoskull',
    displayName: 'Ectoskull',
  },
  {
    name: 'curse',
    displayName: 'Death Curse',
  },
  {
    name: 'manipulator',
    displayName: 'Adaptive Manipulator',
  },
  {
    name: 'virus',
    displayName: 'Virus',
  },
  {
    name: 'gehennan',
    displayName: 'Gehennan',
  },
  {
    name: 'dressed',
    displayName: 'Dressed In Violence',
  },
  {
    name: 'womb',
    displayName: 'Excess Womb',
  },
  {
    name: 'time',
    displayName: 'The Ubiquity Of Time',
  },
]

let isPlaying = false

function playSong() {
  isPlaying = true
  music.play()
}

function pauseSong() {
  isPlaying = false
  music.pause()
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong()
})

function loadInitialSong(song) {
  title.textContent = song.displayName
  music.src = `music/${song.name}.mp3`
}

// Current Song
let songIndex = 0

function prevSong() {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadInitialSong(songs[songIndex])
  playSong()
}

function nextSong() {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadInitialSong(songs[songIndex])
  playSong()
}

loadInitialSong(songs[songIndex])

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement

    // Update Progress Bar Width
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`

    // Total time of song
    const durationMinutes = Math.floor(duration / 60)
    let durationSeconds = Math.floor(duration % 60)
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`
    }

    // Delay switching duration to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`
    }

    // Current time of song
    const currentMinutes = Math.floor(currentTime / 60)
    let currentSeconds = Math.floor(currentTime % 60)
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
  }
}

function setProgressBar(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const { duration } = music
  music.currentTime = (clickX / width) * duration
}

// Events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)
