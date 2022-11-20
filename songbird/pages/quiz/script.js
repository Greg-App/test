import {
  birdsData as birdsDataAll
} from '../../app/js/birds-list.js';
import birdCardHTML from '../../app/js/bird-card.js';
import {
  dictQuiz as dict
} from '../../app/js/dict.js';
import {
  winNoteHTML
} from '../../app/js/misc.js';
import {
  getRandomNum
} from '../../app/js/helpers.js';
import {
  birdPlayerHTML
} from '../../app/js/bird-card.js';
//import {state,addBirdCardInfo,createPlayer,createBirdCard,createFullBirdCard} from '../../app/js/bird-card.js';
//import * as playerModule from '../../app/js/player';


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
  const cardPlay = document.querySelector('.bird-card-play');
  console.log(cardPlay);
  console.log(state.curBirdInfo);
  const birdsCards = document.querySelectorAll('.bird-card');
  birdsCards.forEach((el)=>{
    el.dataset.lang=state.curLang;
    const birdImg=el.querySelector('.bird-card__img');
    //birdImg.alt=`${birdsDataAll[el.dataset.lang][el.dataset.stage][el.dataset.ind].name}`;
  });
  
  state.curBirdInfo = birdsDataAll[cardPlay.dataset.lang][cardPlay.dataset.stage][cardPlay.dataset.ind];
  console.log(state.curBirdInfo);
  curBird=state.curBirdInfo;
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
  if (birdCard.querySelector('.bird-card__preview')) {
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
  const cardInfoPreview = document.querySelector('.bird-card-info .card-preview');
}

function updateLangGeneralInfo() {
  const navList = document.querySelectorAll('.quiz-nav__list-item');
  const lanLocal = localStorage.getItem('songbird-lan') ? localStorage.getItem('songbird-lan') : state.curLang;
  navList.forEach((el, ind) => el.textContent = dict[lanLocal].nav[ind]);
  const nextLevBtn = document.querySelector('.next-level-btn');
  nextLevBtn.textContent = dict[state.curLang].nextLevelBtn;
  const cardInfoPreview = document.querySelector('.bird-card-info .card-preview');
  if (!cardInfoPreview) {
    const cardInfo = document.querySelector('.bird-card-info');
    cardInfo.innerHTML = dict[state.curLang].infoBlock;
    const dashScore = document.querySelector('.dash-score-text');
    dashScore.textContent = `${dict[state.curLang].score}: `;

  }
}

//---Language controls------END-----------

const loadInfoArr = [];
const loadPlayArr = [];

function setDefBirdInfo() {
  const birdInfoBlock = document.querySelector('.bird-card-info');
  birdInfoBlock.innerHTML = dict[state.curLang].infoBlock;
  /* birdInfoBlock.classList.add('show'); */
}


let curBird = birdsData[state.stage][getRandomNum(0, birdsData.length)];
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

function addBirdCardInfo(inpClass, birdObj) {

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

function createBirdCard(inpClass, birdObj, htmlStr) {
  const birdInfoBlock = document.querySelector(`.${inpClass}`);
  birdInfoBlock.innerHTML = htmlStr;
  birdInfoBlock.dataset.lang = state.curLang;
  birdInfoBlock.dataset.stage = state.stage;
  birdInfoBlock.dataset.ind = birdObj.id - 1;
  createPlayer(inpClass, birdObj);
};

function createFullBirdCard(inpClass, birdObj, htmlStr) {
  createBirdCard(inpClass, birdObj, htmlStr);
  addBirdCardInfo(inpClass, birdObj);
};
async function createPlayer(inpClass, birdObj) {
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
    /*---------Audio load block-----START----*/
    song.src = birdObj.audio;
    if (inpClass === 'bird-card-play') {
      loadPlayArr.push(song);
      
    } else {
      loadInfoArr.push(song);
    }
    //when player is ready to play
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

function selectBird(e) {
  if (e.target.closest('.bird-list__list-item')) {
    const selBirdName = e.target.closest('.bird-list__list-item');
    if (!selBirdName.classList.contains('bird-list__list-item_checked')) {
      state.tryCount += 1;
      loadInfoArr.forEach((el) => {
        el.src = "#";
        console.log(loadPlayArr);
      });

    }


    //if selected bird name = win bird name
    console.log('CURRRENT!!!!!!!999999999999999999999999999999999999999999999999999999');
    console.log(selBirdName.children[1].textContent.toLowerCase().trim());
    console.log(state.curBirdInfo.name.toLowerCase());
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
          //show win note
          const pageWrapper = document.querySelector('.page-wrapper');
          const winNote = document.createElement('div');
          winNote.classList.add('win-note');
          const winNoteText = document.createElement('div');
          winNoteText.classList.add('win-note__text');
          const winNoteGameOver = document.createElement('span');
          winNoteGameOver.classList.add('win-note__game-over');
          winNoteGameOver.textContent=dict[state.curLang].winNote[0];
          const br = document.createElement('br');
          const winNoteRedirect = document.createElement('span');
          winNoteRedirect.textContent=dict[state.curLang].winNote[1];
          winNoteRedirect.classList.add('win-note__game-redirect');
          winNoteText.append(winNoteGameOver);
          winNoteText.append(br);
          winNoteText.append(winNoteRedirect);
          winNote.append(winNoteText);
          pageWrapper.prepend(winNote);
          setTimeout(() => {
            window.location.href = '../result/index.html';
            console.log('REDIRECT');
          }, 4000);
        }
      }
      updateScore();
      selBirdName.children[0].style.background = '#008000';
      selBirdName.classList.add('bird-list__list-item_checked');
      const nextBtn = document.querySelector('.next-level-btn');
      nextBtn.classList.add('next-level-btn_active');
      if (state.stage === birdsData.length - 1) {
        nextBtn.disabled = true;
      } else {
        nextBtn.disabled = false;
      }

    } else {
      const clicksound = document.querySelector('.loose');
      clicksound.play();
      selBirdName.children[0].style.background = '#c7300b';
      selBirdName.classList.add('bird-list__list-item_checked');
    }
    const birdInfoSelName = document.querySelector('.bird-card-info .bird-card__preview .bird-card__name');
    if (!birdInfoSelName || birdInfoSelName.textContent.toLowerCase().trim() !== selBirdName.children[1].textContent.toLowerCase().trim()) {
      for (let i = 0; i < birdsData[state.stage].length; i++) {
        if (birdsData[state.stage][i].name.toLowerCase() == selBirdName.children[1].textContent.toLowerCase().trim()) {
          state.curInfoInd = i;
          createFullBirdCard('bird-card-info', birdsData[state.stage][i], birdCardHTML);
        }
      }
    }
  }
}

const nextBtn = document.querySelector('.next-level-btn');
nextBtn.addEventListener('click', moveToNextLevel);
nextBtn.disabled = true;

function moveToNextLevel(e) {
  loadInfoArr.forEach((el) => {
    el.src = "#";
  });
  loadPlayArr.forEach((el) => {
    el.src = "#";
  });
  state.stage += 1;
  state.tryCount = 0;
  state.curInfoInd = null;
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