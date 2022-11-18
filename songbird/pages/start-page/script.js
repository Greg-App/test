import birdsData from '../../app/js/birds-list.js';
import birdCardHTML from '../../app/js/bird-card.js';
import {
  birdPlayerHTML
} from '../../app/js/bird-card.js';
import {getRandomNum} from '../../app/js/helpers.js';
import {winNoteHTML} from '../../app/js/misc.js';

const backBtn = document.querySelector('.back-btn');
backBtn.addEventListener('click',hideGallery);
function hideGallery () {
  const gallery=document.querySelector('.gallery');
  gallery.classList.remove('show-gallery');
}
const galleryBtn = document.querySelector('.gallery-btn');
galleryBtn.addEventListener('click',showGallery);
function showGallery () {
  const gallery=document.querySelector('.gallery');
  gallery.classList.add('show-gallery');
}

const state = {
  stage: 0,
  score: 0,
  defBirdInfo: 'Послушайте плеер.<br>Выберите птицу из списка',
  curBirdInfo: null,
  tryCount: 0,
  imgLoadingCount: 0,
  loadInfoArr: [],
  loadPlayArr: []
};

const loadInfoArr = [];
const loadPlayArr = [];

/* function setDefBirdInfo() {
  const birdInfoBlock = document.querySelector('.bird-card-info');
  birdInfoBlock.innerHTML = state.defBirdInfo;
}
setDefBirdInfo(); */

let curBird = birdsData[state.stage][getRandomNum(0, birdsData.length)];
console.log('curBird: ', curBird);
state.curBirdInfo = curBird;
console.log(state);
/*-create preview birdCard---------*/
//createBirdCard('bird-card-play', curBird, birdCardHTML);

/*----create/update bird list, current stage and score START--------*/


/*----create/update bird info block     START--------*/

 function addBirdCardInfo (inpClass, birdObj) {

  const birdInfoBlock = document.querySelector(`.${inpClass}`);
  const birdCardImg = birdInfoBlock.querySelector('.bird-card__img');
  const img = new Image();
  const birdCardImgCover = birdInfoBlock.querySelector('.bird-card-img__cover');
  state.imgLoadingCount += 1;
  console.log('start', state.imgLoadingCount);
  const loadIcon = document.createElement('div');
  loadIcon.classList.add('loading');
  birdCardImgCover.append(loadIcon);
  async function loadImg() {
    fetch(birdObj.image)
      .then(res => {
        if (res.ok) {
          img.src = res.url;
          if (inpClass === 'bird-card-play') {
            loadPlayArr.push(img);
            console.log(loadPlayArr);
          } else {
            loadInfoArr.push(img);
          }

          img.classList.add('bird-card__img');
          img.alt = `bird-img ${birdObj.name}`;
          img.title = `${birdObj.name}`;
          img.width = '200';
          img.height = '133.45';
          /* img.onload = function () {
        state.imgLoadingCount-=1;
        birdCardImg.replaceWith(img);
        birdCardImgCover.lastChild.remove();
     } */
          /* img.addEventListener('error', () => {
            img.src = birdObj.image;
            state.imgLoadingCount -= 1;
            loadIcon.textContent = `Failed to load picture`;
            loadIcon.style.background = 'none';
          }); */
          return res;
        } else if (res.status === 404) {
          //img.src = 'http://xxxx';
          state.imgLoadingCount -= 1;
          loadIcon.textContent = `Failed to load picture (Error ${res.status})`;
          loadIcon.style.background = 'none';
          return Promise.reject('error 404');
        } else {
          //img.src = 'http://xxxx';
          state.imgLoadingCount -= 1;
          loadIcon.textContent = `Failed to load picture (Error ${res.status})`;
          loadIcon.style.background = 'none';
          return Promise.reject('some other error: ' + res.status);
        }
      })
      .then(data => {
        img.onload = function () {
          state.imgLoadingCount -= 1;
          birdCardImg.replaceWith(img);
          console.log('end ok', state.imgLoadingCount);
          console.log(img);
          birdCardImgCover.lastChild.remove();
          loadIcon.textContent = `Failed to load picture (Error)`;
        }
      })
      .catch(error => {
        //img.src = 'http://xxxx';
        state.imgLoadingCount -= 1;
        console.log('error end ', state.imgLoadingCount);
        loadIcon.textContent = `Failed to load picture (Error)`;
        loadIcon.style.background = 'none';
      });


  }
  loadImg();
  const birdCardName = birdInfoBlock.querySelector('.bird-card__name');
  birdCardName.textContent = birdObj.name;
  const birdCardSpecies = birdInfoBlock.querySelector('.bird-card__gen');
  birdCardSpecies.textContent = birdObj.species;
  const birdCardDescr = birdInfoBlock.querySelector('.bird-card__description');
  birdCardDescr.textContent = birdObj.description;
};

function createBirdCard (inpClass, birdObj, htmlStr) {
  const birdInfoBlock = document.querySelector(`.${inpClass}`);
  birdInfoBlock.innerHTML = htmlStr;
  createPlayer(inpClass, birdObj);
};

function createFullBirdCard (inpClass, birdObj, htmlStr)  {
  createBirdCard(inpClass, birdObj, htmlStr);
  addBirdCardInfo(inpClass, birdObj);
};
async function createPlayer (inpClass, birdObj) {
  console.log('Создать плеер');
  const birdInfoBlock = document.querySelector(`.${inpClass}`);
  const birdCardPlayer = birdInfoBlock.querySelector('.bird-card__player');
  const player = document.createElement('div');
  player.innerHTML = birdPlayerHTML;
  player.classList.add('player');
  birdCardPlayer.append(player);
  birdCardPlayer.children[0].style.display = 'inline-block';
  birdCardPlayer.children[0].textContent = 'Loading...';
  const audioTrack = birdCardPlayer.querySelector('.audio');
  const song = new Audio();
  song.classList.add('audio');
  song.preload = 'auto';

  const newAudio = new Promise(function (resolve, reject) {
    //birdObj.audio
    console.log(birdObj.audio);
    /*---------Audio load block-----START----*/
    console.log('Audio fetch is All right');
    song.src = birdObj.audio;
    if (inpClass === 'bird-card-play') {
      loadPlayArr.push(song);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log(loadPlayArr);
    } else {
      loadInfoArr.push(song);
    }
    //when player is ready to play
    console.log('Создаем слушателя на canplaythrough');
    song.addEventListener('canplaythrough', () => {
      console.log("Аудио загрузилось");
      player.classList.add('show-loaded');
      birdCardPlayer.children[0].style.display = 'none';
      audioTrack.replaceWith(song);
      birdCardPlayer.classList.add('show-loaded');
      resolve();
    });
    /*---------Audio load block-----END----*/
   /*  const data = fetch(birdObj.audio, {
      mode: 'no-cors'
    }).then(response => {
      console.log(response);
      //audio load block
    }).catch((e) => {
      birdCardPlayer.children[0].style.display = 'inline-block';
      birdCardPlayer.children[0].textContent = 'Failed to load audio';
      console.log('some fetch error (song loading) ', e);
      reject();
    });

    console.log(data); */

  });

  function afterLoad() {
    console.log("Аудио загрузилось");
    player.classList.add('show-loaded');
    birdCardPlayer.children[0].style.display = 'none';
    audioTrack.replaceWith(song);
    birdCardPlayer.classList.add('show-loaded');
    resolve();
  }

  await newAudio.then(() => {
    console.log('ok');
  }).catch(() => console.log('errorrrrr'));
  song.removeEventListener('canplaythrough', afterLoad);
  const audio = birdCardPlayer.querySelector('.audio');
  console.log('newAudio results audio: ', audio);
  //audioTrack.src = birdObj.audio; 

  let isPlay = false;
  let trackNum = 0;
  const playBtn = birdCardPlayer.querySelector('.play');

  console.log('!!!!!!!!!!!!');
  console.log(audio);
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

  /* audio.addEventListener('loadedmetadata', () => {
    playBar.max = audio.duration;
  }); */
  playBar.max = audio.duration;

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
};








/* const context = new AudioContext();
let aud; */
/* fetch(curBird.audio,{mode:'no-cors'}).then(data=>data.arrayBuffer()).then(arrayBuffer=>context.decodeAudioData(arrayBuffer)).then(decodedAudio=> {aud=decodedAudio;}); */

/* const body =document.body;
body.append(aud);
body.addEventListener('mousedown',()=>{aud.play();});
fetch(curBird.audio,{mode:'no-cors'}).then((r)=>console.log(r)); */