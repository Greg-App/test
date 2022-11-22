import {birdsData as birdsDataAll} from '../../app/js/birds-list.js';
import birdCardHTML from '../../app/js/bird-card.js';
import {
  birdPlayerHTML
} from '../../app/js/bird-card.js';
import {
  getRandomNum
} from '../../app/js/helpers.js';
import {
  winNoteHTML
} from '../../app/js/misc.js';
import {
  dictQuiz as dict
} from '../../app/js/dict.js';
const backBtn = document.querySelector('.back-btn');
backBtn.addEventListener('click', backToMain);

function backToMain() {
  window.location.href = '../start-page/index.html';
}


const state = {
  curLang: 'ru',
  stage: 0,
  curInfoInd: null,
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

//---Language controls------START-----------

const langSelector = document.querySelector('.btn-lang');
langSelector.addEventListener('change', (e) => {
  localStorage.setItem('songbird-lan', `${langSelector.value}`);
  updatePageLang();
  birdsData = getBirdsData();
  updateLangBirdList();
  updateLangGeneralInfo();
  const cards = document.querySelectorAll('.bird-card');
  cards.forEach((el) => {
    updateLangBirdInfo(el);
  });
  /* const cardPlay = document.querySelector('.bird-card-play');
  console.log(cardPlay);
  console.log(state.curBirdInfo);
  const birdsCards = document.querySelectorAll('.bird-card');
  birdsCards.forEach((el)=>{
    el.dataset.lang=state.curLang;
    const birdImg=el.querySelector('.bird-card__img');
    birdImg.alt=`${birdsDataAll[el.dataset.lang][el.dataset.stage][el.dataset.ind].name}`;
  }); */
  
  /* state.curBirdInfo = birdsDataAll[cardPlay.dataset.lang][cardPlay.dataset.stage][cardPlay.dataset.ind];
  console.log(state.curBirdInfo);
  curBird=state.curBirdInfo; */
});

updatePageLang();
let birdsData = getBirdsData();
console.log(birdsData);
updateLangGeneralInfo();


function updateStateCurLang() {
  const lanLocal = localStorage.getItem('songbird-lan');
  state.curLang = lanLocal ? lanLocal : 'ru';
}

function showCurLang() {
  langSelector.value = state.curLang;
}

function updatePageLang() {
  updateStateCurLang();
  showCurLang();
}

function getBirdsData() {
  return birdsDataAll[state.curLang];
}

/*--- update page according to language-------*/

function updateLangBirdList() {
  const birdsList = document.querySelectorAll('.bird-list__item-text');
  birdsList.forEach((el, ind) => el.textContent = birdsData[state.stage][ind].name);
  const cardInfoPreview = document.querySelector('.bird-card-info .card-preview');
}

function updateLangBirdInfo(birdCard) {

  const birdName = birdCard.querySelector('.bird-card__name');
  birdName.textContent = birdsData[state.stage][birdCard.dataset.ind].name;
  const birdImg = birdCard.querySelector('.bird-card__img');
      birdImg.alt=`${birdName.textContent}`;
      birdImg.title=`${birdName.textContent}`;
      const birdGen = birdCard.querySelector('.bird-card__gen');
    birdGen.textContent = birdsData[state.stage][birdCard.dataset.ind].species;
    const birdDescr = birdCard.querySelector('.bird-card__description');
    birdDescr.textContent = birdsData[state.stage][birdCard.dataset.ind].description;
  /* if (birdCard.querySelector('.bird-card__preview')) {
    const birdName = birdCard.querySelector('.bird-card__name');
    const regex = /[\*]/g;
    if (!(birdName.textContent.match(regex) !== null && birdName.textContent.match(regex).length === birdName.textContent.length)) {
      birdName.textContent = birdsData[state.stage][birdCard.dataset.ind].name;
      const birdImg = birdCard.querySelector('.bird-card__img');
      birdImg.alt=`${birdName.textContent}`;
      birdImg.title=`${birdName.textContent}`;
    };
    const birdGen = birdCard.querySelector('.bird-card__gen');
    birdGen.textContent = birdsData[state.stage][birdCard.dataset.ind].species;
    const birdDescr = birdCard.querySelector('.bird-card__description');
    birdDescr.textContent = birdsData[state.stage][birdCard.dataset.ind].description;
  }
  const birdsList = document.querySelectorAll('.bird-list__item-text');
  birdsList.forEach((el, ind) => el.textContent = birdsData[state.stage][ind].name);
  const cardInfoPreview = document.querySelector('.bird-card-info .card-preview'); */
}

function updateLangGeneralInfo() {
  const navList = document.querySelectorAll('.quiz-nav__list-item');
  const lanLocal = localStorage.getItem('songbird-lan') ? localStorage.getItem('songbird-lan') : state.curLang;
  navList.forEach((el, ind) => el.textContent = dict[lanLocal].nav[ind]);
  const backBtn = document.querySelector('.back-btn');
  console.log(dict);
  backBtn.textContent=dict[lanLocal].backBtn;
}

//---Language controls------END-----------

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


function updateCurrStage() {
  const oldstageAct = document.querySelector('.quiz-nav__list-item_active');
  if (oldstageAct) {
    oldstageAct.classList.remove('quiz-nav__list-item_active');
  }
  const stageList = document.querySelectorAll('.quiz-nav__list-item');
  stageList[state.stage].classList.toggle('quiz-nav__list-item_active');
}

const navList = document.querySelector('.nav-list');
navList.addEventListener('click', chooseGen);

function chooseGen(e) {
  const selectedItem=e.target.closest('.nav-list__list-item');
  if (selectedItem) {
    if (!selectedItem.classList.contains('quiz-nav__list-item_active')) {
      const oldstageAct = document.querySelector('.quiz-nav__list-item_active');
      const navList = document.querySelectorAll('.nav-list__list-item');
      navList.forEach((el,ind)=>{
        if(el.textContent===selectedItem.textContent) {
          state.stage=ind;
          
          const birdGallery = document.querySelector('.bird-gallery');
          birdGallery.replaceChildren();
          displayBirdList(ind);
        }
      });
    }
  }

}

function displayBirdList(stage) {
  birdsData[stage].forEach((elIn) => {
    insertBirdCard('bird-gallery', 'bird-card', elIn, birdCardHTML);
  });
  updateCurrStage();
}
displayBirdList(state.stage);



function insertBirdCard(cardBoxClass, inpClass, birdObj, htmlStr) {
  const birdCardBox = document.querySelector(`.${cardBoxClass}`);
  const birdCard = document.createElement('div');
  birdCard.classList.add(inpClass);
  birdCard.classList.add('block');
  birdCardBox.append(birdCard);
  createBirdCard(inpClass, birdObj, htmlStr, birdCard);
  addBirdCardInfo(inpClass, birdObj, birdCard);

}

function addBirdCardInfo(inpClass, birdObj, birdCardElement) {
  const birdInfoBlock = birdCardElement;
  //const birdInfoBlock = document.querySelector(`.${inpClass}`);
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
        };
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
}

function createBirdCard(inpClass, birdObj, htmlStr, birdCardElement) {
  //const birdInfoBlock = document.querySelector(`.${inpClass}`);
  const birdInfoBlock = birdCardElement;
  birdInfoBlock.innerHTML = htmlStr;
  birdInfoBlock.dataset.lang = state.curLang;
  birdInfoBlock.dataset.stage = state.stage;
  birdInfoBlock.dataset.ind = birdObj.id - 1;
  createPlayer(inpClass, birdObj, birdCardElement);
}

function createFullBirdCard(inpClass, birdObj, htmlStr, birdCardElement) {
  createBirdCard(inpClass, birdObj, htmlStr, birdCardElement);
  addBirdCardInfo(inpClass, birdObj, birdCardElement);
}
async function createPlayer(inpClass, birdObj, birdCardElement) {
  console.log('Создать плеер');
  const birdInfoBlock = birdCardElement;
  //const birdInfoBlock = document.querySelector(`.${inpClass}`);
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
    const barOffset=(playBar.value/playBar.max);
    playBar.style.setProperty('--barOffset', `${barOffset}`);
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








/* const context = new AudioContext();
let aud; */
/* fetch(curBird.audio,{mode:'no-cors'}).then(data=>data.arrayBuffer()).then(arrayBuffer=>context.decodeAudioData(arrayBuffer)).then(decodedAudio=> {aud=decodedAudio;}); */

/* const body =document.body;
body.append(aud);
body.addEventListener('mousedown',()=>{aud.play();});
fetch(curBird.audio,{mode:'no-cors'}).then((r)=>console.log(r)); */