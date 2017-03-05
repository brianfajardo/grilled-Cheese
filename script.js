const video = document.querySelector('.viewer')
const player = document.querySelector('.player')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullscreen = player.querySelector('.fullscreen')

const app = {
    togglePlay: () => {
        const method = video.paused ? 'play' : 'pause';
        video[method](); /* use ternary to determine video[property] */
    },
    updateButton() { /* Bypass arrow function `this` problem */
        const icon = this.paused ? '►' : '❚❚';
        toggle.textContent = icon
    },
    skip() {
        video.currentTime += Number(this.dataset.skip) /* convert string to number */
    },
    handleRangeUpdate() {
        video[this.name] = this.value
    },
    handleProgress() {
        const percent = (video.currentTime / video.duration) * 100; /* using currentTime and duration to determine progress bar fill */
        progressBar.style.flexBasis = `${percent}%`
    },
    jump(e) {
        const jumpTime = (e.offsetX / progress.offsetWidth) * video.duration;
        // e.offsetX = the offset in the x-coordinate of the mouse pointer between the event and the edge of the target node
        // progress.offsetWidth = entire width of the entire progress bar, returns a %
        video.currentTime = jumpTime
    },
    toggleFullscreen: () => {
        video.webkitRequestFullscreen()
    }
};

// Video 
video.addEventListener('click', app.togglePlay)
video.addEventListener('play', app.updateButton)
video.addEventListener('pause', app.updateButton)
video.addEventListener('timeupdate', app.handleProgress)

// Play button
toggle.addEventListener('click', app.togglePlay)

// Skip buttons
skipButtons.forEach(button => { button.addEventListener('click', app.skip) })

// Volume and playback rate
ranges.forEach(slider => { slider.addEventListener('input', app.handleRangeUpdate) })

// Progress bar
let mouseDown = false;
progress.addEventListener('click', app.jump)
progress.addEventListener('mousemove', (e) => mouseDown && app.jump(e))
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)

// Fullscreen
fullscreen.addEventListener('click', app.toggleFullscreen)