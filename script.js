const video = document.querySelector('.viewer')
const player = document.querySelector('.player')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelector('.player__slider')

const app = {
    togglePlay: () => {
        const method = video.paused ? 'play' : 'pause';
        video[method](); /* use ternary to determine video[property] */
    },
    updateButton () { /* Bypass arrow function `this` problem */
        const icon = this.paused ? '►' : '❚❚';
        toggle.textContent = icon
    },
    skip () {
        video.currentTime += Number(this.dataset.skip) /* convert string to number */
    },
};

video.addEventListener('click', app.togglePlay)
video.addEventListener('play', app.updateButton)
video.addEventListener('pause', app.updateButton)
toggle.addEventListener('click', app.togglePlay)

skipButtons.forEach(button => {
    button.addEventListener('click', app.skip)
})