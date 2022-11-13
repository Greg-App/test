import birdsData from '../../app/js/birds-list.js';
//import * as playerModule from '../../app/js/player';

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
console.log(birdsData);

const state = {
  stage: 0,
  score: 0,
};
let curBird = birdsData[state.stage][getRandomNum(0, birdsData.length - 1)];
console.log('curBird: ', curBird);

/*----create/update bird list, current stage and score START--------*/
function updScore() {
  const score=document.querySelector('.dash-score');
  score.textContent=state.score;
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
if(oldstageAct) {oldstageAct.classList.remove('quiz-nav__list-item_active');}
const stageList = document.querySelectorAll('.quiz-nav__list-item');
stageList[state.stage].classList.toggle('quiz-nav__list-item_active');
}
createBirdList();
updateCurrStage();
updScore();
/*----create/update bird list, current stage and score END--------*/

function selectBird(e) {
  console.log('hey');
  }