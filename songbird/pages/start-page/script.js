import birdsData from '../../app/js/birds-list.js';
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


const galleryBtn = document.querySelector('.gallery-btn');
galleryBtn.addEventListener('click', moveToGallery);
function moveToGallery() {
  window.location.href='../gallery/index.html';
}

