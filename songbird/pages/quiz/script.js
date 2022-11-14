import birdsData from '../../app/js/birds-list.js';
import birdCardHTML from '../../app/js/bird-card.js';
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
}
setDefBirdInfo();
let curBird = birdsData[state.stage][getRandomNum(0, birdsData.length - 1)];
console.log('curBird: ', curBird);
state.curBirdInfo = curBird;
console.log(state);
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
      /*win*/
      if (!selBirdName.classList.contains('bird-list__list-item_checked')) {
        state.score =birdsData[state.stage].length - state.tryCount;
        }
      updateScore();
      selBirdName.children[0].style.background = '#008000';
      selBirdName.classList.add('bird-list__list-item_checked');
      const nextBtn =document.querySelector('.next-level-btn');
      nextBtn.classList.add('next-level-btn_active');

    } else {
      selBirdName.children[0].style.background = '#c7300b';
      selBirdName.classList.add('bird-list__list-item_checked');
    }
    const birdInfoSelName = document.querySelector('.bird-card-info .bird-card__preview .bird-card__name');
    if (!birdInfoSelName||birdInfoSelName.textContent.toLowerCase().trim()!==selBirdName.children[1].textContent.toLowerCase().trim()) {
    for (let key of birdsData[state.stage]) {
      if (key.name.toLowerCase() == selBirdName.children[1].textContent.toLowerCase().trim()) {
        const birdInfoBlock = document.querySelector('.bird-card-info');
        birdInfoBlock.innerHTML = birdCardHTML;
        const birdCardImg = birdInfoBlock.querySelector('.bird-card__img');
        birdCardImg.src = key.image;
        birdCardImg.alt = `bird-img ${key.name}`;
        const birdCardName = birdInfoBlock.querySelector('.bird-card__name');
        birdCardName.textContent = key.name;
        const birdCardSpecies = birdInfoBlock.querySelector('.bird-card__gen');
        birdCardSpecies.textContent = key.species;
        const birdCardDescr = birdInfoBlock.querySelector('.bird-card__description');
        birdCardDescr.textContent = key.description;
      }
    }
  }


  }
}