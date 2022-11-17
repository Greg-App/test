import birdsData from '../../app/js/birds-list.js';
import birdCardHTML from '../../app/js/bird-card.js';
import {
  birdPlayerHTML
} from '../../app/js/bird-card.js';
//import * as playerModule from '../../app/js/player';

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
console.log(birdsData);

const state = {
  stage: 0,
  score: 0,
  defBirdInfo: 'Послушайте плеер.<br>Выберите птицу из списка',
  curBirdInfo: null,
  tryCount: 0
};

function setDefBirdInfo() {
  const birdInfoBlock = document.querySelector('.bird-card-info');
  birdInfoBlock.innerHTML = state.defBirdInfo;
  /* birdInfoBlock.classList.add('show'); */
}
setDefBirdInfo();

let curBird = birdsData[state.stage][getRandomNum(0, birdsData.length - 1)];
console.log('curBird: ', curBird);
state.curBirdInfo = curBird;
console.log(state);
/*-create preview birdCard---------*/
createBirdCard('bird-card-play', curBird, birdCardHTML);

/*----create/update bird list, current stage and score START--------*/
function updateScore() {
  const score = document.querySelector('.dash-score');
  score.textContent = state.score;
}

const birdList = document.querySelector('.bird-list');
birdList.addEventListener('click', selectBird);

function createBirdList() {
  if (birdList.children) {
    birdList.replaceChildren();
  }
  birdsData[state.stage].forEach((el) => {
    const birdItem = document.createElement('li');
    birdItem.classList.add('bird-list__list-item');
    const birdItemCheck = document.createElement('div');
    birdItemCheck.classList.add('bird-list__item-check');
    const birdItemText = document.createElement('span');
    birdItemText.classList.add('bird-list__item-text');
    birdItemText.textContent = el.name;
    birdItem.append(birdItemCheck);
    birdItem.append(birdItemText);
    birdList.append(birdItem);
  });
}

function updateCurrStage() {
  const oldstageAct = document.querySelector('.quiz-nav__list-item_active');
  if (oldstageAct) {
    oldstageAct.classList.remove('quiz-nav__list-item_active');
  }
  const stageList = document.querySelectorAll('.quiz-nav__list-item');
  stageList[state.stage].classList.toggle('quiz-nav__list-item_active');
}
createBirdList();
updateCurrStage();
updateScore();
/*----create/update bird list, current stage and score END--------*/

/*----create/update bird info block     START--------*/

function selectBird(e) {
  if (e.target.closest('.bird-list__list-item')) {
    const selBirdName = e.target.closest('.bird-list__list-item');
    if (!selBirdName.classList.contains('bird-list__list-item_checked')) {
      state.tryCount += 1;
    }

    if (selBirdName.children[1].textContent.toLowerCase().trim() == state.curBirdInfo.name.toLowerCase()) {
      /*if win level*/
      const clicksound = document.querySelector('.win');
      clicksound.play();
      const allAudioBtn = document.querySelectorAll('.bird-card .play');
      allAudioBtn.forEach((el) => {
        if (el.classList.contains('pause')) {
          el.click();
        }
      });
      if (!selBirdName.classList.contains('bird-list__list-item_checked')) {
        state.score = state.score + birdsData[state.stage].length - state.tryCount;
        addBirdCardInfo('bird-card-play', curBird);
        if (state.stage === birdsData.length - 1) {
          /*if win game*/
          localStorage.setItem('songbird-score', `${state.score}`);
          const birdCardImg = birdInfoBlock.querySelector('.bird-card__img');
          img.src = birdObj.image;
          img.addEventListener('load', () => {
            birdCardImg.src = birdObj.image;
          });
          setTimeout(() => {
            window.location.href = '../result/index.html';
          }, 2000);
        }
      }
      updateScore();
      selBirdName.children[0].style.background = '#008000';
      selBirdName.classList.add('bird-list__list-item_checked');
      const nextBtn = document.querySelector('.next-level-btn');
      nextBtn.classList.add('next-level-btn_active');
      nextBtn.disabled = false;

    } else {
      const clicksound = document.querySelector('.loose');
      clicksound.play();
      selBirdName.children[0].style.background = '#c7300b';
      selBirdName.classList.add('bird-list__list-item_checked');
    }
    const birdInfoSelName = document.querySelector('.bird-card-info .bird-card__preview .bird-card__name');
    if (!birdInfoSelName || birdInfoSelName.textContent.toLowerCase().trim() !== selBirdName.children[1].textContent.toLowerCase().trim()) {
      for (let key of birdsData[state.stage]) {
        if (key.name.toLowerCase() == selBirdName.children[1].textContent.toLowerCase().trim()) {
          createFullBirdCard('bird-card-info', key, birdCardHTML);
        }
      }
    }
  }
}

function createPlayer(inpClass, birdObj) {
  const birdInfoBlock = document.querySelector(`.${inpClass}`);
  const birdCardPlayer = birdInfoBlock.querySelector('.bird-card__player');
  birdCardPlayer.innerHTML = birdPlayerHTML;
  const audioTrack = birdCardPlayer.querySelector('.audio');
  audioTrack.src = birdObj.audio;

  let isPlay = false;
  let trackNum = 0;
  const playBtn = birdCardPlayer.querySelector('.play');
  const audio = birdCardPlayer.querySelector('.audio');
  playBtn.addEventListener('click', togglePlay);
  audio.addEventListener('ended', () => {
    playBtn.classList.toggle('pause');
    isPlay = false;
    curPlayTime = 0;
    console.log('END');
    console.log(isPlay);
  });

  let curPlayTime = 0;

  function playAudio() {
    audio.currentTime = curPlayTime;
    audio.play();
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
  }


  /*-------Audio Player Enhanced (custom)-START---------*/

  function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec}`;
  }

  function updateCurTime() {
    const curTime = birdCardPlayer.querySelector('.cur-time');
    const durTime = birdCardPlayer.querySelector('.total-dur');

    if (isNaN(audio.duration)) {
      curTime.textContent = '00:00';
      durTime.innerHTML = '00:00';
    } else {
      curTime.textContent = formatTime(Math.floor(audio.currentTime));
      durTime.textContent = formatTime(Math.floor(audio.duration));
    }
  }
  updateCurTime();

  /*--progress bar operating---*/
  let playBarPressed = false;
  const playBar = birdCardPlayer.querySelector('#playBar');
  playBar.addEventListener("mousedown", e => {
    playBarPressed = true;
    console.log(playBarPressed);
  });
  playBar.addEventListener("click", e => {
    playBarPressed = false;
    console.log(playBarPressed);
  });
  playBar.addEventListener("click", e => {
    const playBarWidth = window.getComputedStyle(playBar).width;
    const curTime = e.offsetX / parseInt(playBarWidth) * audio.duration;
    audio.currentTime = curTime;
    curPlayTime = curTime;
  }, false);

  audio.addEventListener('loadedmetadata', () => {
    playBar.max = audio.duration;
  });

  function updatePlayBar() {
    if (playBarPressed === false) {
      playBar.value = audio.currentTime;
    }
    updateCurTime();
  }
  setInterval(updatePlayBar, 10);

  const volumeBtn = birdCardPlayer.querySelector('.volume-icon img');
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

  const volBar = birdCardPlayer.querySelector('.volume-bar');
  volBar.addEventListener('click', changeVolume);

  function changeVolume(e) {
    const volBarWidth = window.getComputedStyle(volBar).width;
    const volCurrent = birdCardPlayer.querySelector('.volume-current');
    audio.volume = (e.offsetX / parseInt(volBarWidth));
    volCurrent.style.width = audio.volume * 100 + '%';
  }


  /*-------Audio Player Enhanced (custom)-END--------------------------------*/
}

function addBirdCardInfo(inpClass, birdObj) {
  const birdInfoBlock = document.querySelector(`.${inpClass}`);
  const birdCardImg = birdInfoBlock.querySelector('.bird-card__img');
  console.log(birdCardImg);
  const img = new Image();
  img.src = birdObj.image;
  img.classList.add('bird-card__img');
  img.alt = `bird-img ${birdObj.name}`;
  img.title = `${birdObj.name}`;
  img.width='200';
  img.height='133.45';
  state.imgLoadingCount+=1;
  const birdCardImgCover = birdInfoBlock.querySelector('.bird-card-img__cover');
  const loadIcon = document.createElement('div');
  loadIcon.classList.add('loading');
  birdCardImgCover.append(loadIcon);
  img.onload = function () {
    birdCardImg.replaceWith(img);
    birdCardImgCover.lastChild.remove();
 }
  img.addEventListener('error', () => {
    img.src = birdObj.image;
    state.imgLoadingCount-=1;
    loadIcon.style.textContent='Failed to load picture';
  });
  const birdCardName = birdInfoBlock.querySelector('.bird-card__name');
  birdCardName.textContent = birdObj.name;
  const birdCardSpecies = birdInfoBlock.querySelector('.bird-card__gen');
  birdCardSpecies.textContent = birdObj.species;
  const birdCardDescr = birdInfoBlock.querySelector('.bird-card__description');
  birdCardDescr.textContent = birdObj.description;
}

function createBirdCard(inpClass, birdObj, htmlStr) {
  const birdInfoBlock = document.querySelector(`.${inpClass}`);
  birdInfoBlock.innerHTML = htmlStr;
  createPlayer(inpClass, birdObj);
}

function createFullBirdCard(inpClass, birdObj, htmlStr) {
  createBirdCard(inpClass, birdObj, htmlStr);
  addBirdCardInfo(inpClass, birdObj);
}


const nextBtn = document.querySelector('.next-level-btn');
nextBtn.addEventListener('click', moveToNextLevel);
nextBtn.disabled = true;

function moveToNextLevel(e) {
  state.stage += 1;
  state.tryCount = 0;
  updateCurrStage();
  createBirdList();
  setDefBirdInfo();
  nextBtn.disabled = true;
  nextBtn.classList.remove('next-level-btn_active');
  curBird = birdsData[state.stage][getRandomNum(0, birdsData.length - 1)];
  console.log('curBird: ', curBird);
  state.curBirdInfo = curBird;
  createBirdCard('bird-card-play', curBird, birdCardHTML);
}


/* const context = new AudioContext();
let aud; */
/* fetch(curBird.audio,{mode:'no-cors'}).then(data=>data.arrayBuffer()).then(arrayBuffer=>context.decodeAudioData(arrayBuffer)).then(decodedAudio=> {aud=decodedAudio;}); */

/* const body =document.body;
body.append(aud);
body.addEventListener('mousedown',()=>{aud.play();});
fetch(curBird.audio,{mode:'no-cors'}).then((r)=>console.log(r)); */