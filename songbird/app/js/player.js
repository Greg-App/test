
/*-------Audio player Basic----------------*/
let isPlay = false;
let trackNum = 0;
const playBtn = document.querySelector('.play');
const audio = document.querySelector('.audio');
playBtn.addEventListener('click', togglePlay);
let curPlayTime = 0;
function playAudio() {
    audio.play();
    audio.currentTime = curPlayTime;
    isPlay = true;
}

function pauseAudio() {
    curPlayTime = audio.currentTime;
    audio.pause();
    audio.currentTime = curPlayTime;
    isPlay = false;
}

function togglePlay() {
    if (isPlay === false) {
        playAudio();
        playBtn.classList.toggle('pause');
    } else {
        pauseAudio();
        playBtn.classList.toggle('pause');
    }
    /* showTrackName(); */
}

/*-------Audio Player Enhanced (custom)-START---------*/
//const trackName = document.querySelector('.track-name span');

/* function showTrackName() {
    const playItemAct = document.querySelector('.item-active');

    if (playItemAct) {
        trackName.textContent = playList[trackNum].title;
    }

}
showTrackName(); */

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

function updateCurTime() {
    const curTime = document.querySelector('.cur-time');
    const durTime = document.querySelector('.total-dur');

    if (isNaN(audio.duration)) {
        curTime.textContent = '00:00';
        durTime.innerHTML = '00:00';
    } else {
        curTime.textContent = formatTime(Math.floor(audio.currentTime));
        durTime.textContent = formatTime(Math.floor(audio.duration));
    }
}
updateCurTime();
const playBar = document.querySelector('#playBar');

playBar.addEventListener("click", e => {
    const playBarWidth = window.getComputedStyle(playBar).width;
    const curTime = e.offsetX / parseInt(playBarWidth) * audio.duration;
    audio.currentTime = curTime;
    curPlayTime = curTime;
}, false);

function updatePlayBar() {
    playBar.max = audio.duration;
    playBar.value = audio.currentTime;
    updateCurTime();
}
setInterval(updatePlayBar, 500);

const volumeBtn = document.querySelector('.volume-icon img');
volumeBtn.addEventListener('click', mute);

function mute() {
    if (audio.muted === false) {
        audio.muted = true;
        volumeBtn.src = '../../assets/icons/volume-off-svgrepo-com.svg';
    } else {
        audio.muted = false;
        volumeBtn.src = '../../assets/icons/volume-low-svgrepo-com.svg';
    }
}

const volBar = document.querySelector('.volume-bar');
volBar.addEventListener('click', changeVolume);

function changeVolume(e) {
    const volBarWidth = window.getComputedStyle(volBar).width;
    const volCurrent = document.querySelector('.volume-current');
    audio.volume = (e.offsetX / parseInt(volBarWidth));
    volCurrent.style.width = audio.volume * 100 + '%';
}

/*-------Audio Player Enhanced (custom)-END---------*/

