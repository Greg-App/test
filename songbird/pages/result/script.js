import {
  dictResult as dict
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

//---Language controls------START-------------------------

const langSelector = document.querySelector('.btn-lang');
langSelector.addEventListener('change', (e) => {
  localStorage.setItem('songbird-lan', `${langSelector.value}`);
  updatePageLang();
  updateLangGeneralInfo();
});

updatePageLang();
updateLangGeneralInfo();
const scoreBox = document.querySelector('.score');
const score = localStorage.getItem('songbird-score');
scoreBox.textContent = `${score} / 30`;
if(score==30) {
  const maxScore = document.querySelector('.max-score');
  maxScore.textContent=dict[state.curLang].maxScore;
  maxScore.classList.add('showBlock');
}

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
  const lanLocal = localStorage.getItem('songbird-lan') ? localStorage.getItem('songbird-lan') : state.curLang;
  navList.forEach((el, ind) => el.textContent = dict[lanLocal].nav[ind]);
  const title = document.querySelector('.result-quiz__title');
  const descript = document.querySelector('.descript');
  const description = document.querySelector('.description');
  title.textContent=dict[lanLocal].title;
  descript.textContent=dict[lanLocal].descript;
  description.textContent=dict[lanLocal].description;
  const maxScore = document.querySelector('.max-score');
  maxScore.textContent=dict[state.curLang].maxScore;
  
}

//---Language controls------END--------------------------

