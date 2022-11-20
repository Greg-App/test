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
  dictStart as dict
} from '../../app/js/dict.js';

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

const galleryBtn = document.querySelector('.gallery-btn');
galleryBtn.addEventListener('click', moveToGallery);
function moveToGallery() {
  window.location.href='../gallery/index.html';
}

//---Language controls------START-------------------------

const langSelector = document.querySelector('.btn-lang');
langSelector.addEventListener('change', (e) => {
  localStorage.setItem('songbird-lan', `${langSelector.value}`);
  updatePageLang();
  updateLangGeneralInfo();
});

updatePageLang();
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

/*--- update page according to language-------*/

function updateLangGeneralInfo() {
  const navList = document.querySelectorAll('.nav-list__item-link');
  console.log(navList);
  const lanLocal = localStorage.getItem('songbird-lan') ? localStorage.getItem('songbird-lan') : state.curLang;
  navList.forEach((el, ind) => el.textContent = dict[lanLocal].nav[ind]);
  const title = document.querySelector('.start-quiz__title');
  const subtitle = document.querySelector('.start-quiz__subtitle');
  const description = document.querySelector('.start-quiz__description');
  title.textContent=dict[lanLocal].title;
  subtitle.textContent=dict[lanLocal].subtitle;
  description.textContent=dict[lanLocal].description;
  
}

//---Language controls------END--------------------------