const birdCardHTML = '<img class="bird-card__img" src="../../assets/images/cover-bird-card.png" width="200" height="133.45" alt="bird-card-cover"><div class="bird-card__preview card-preview"><div class="bird-card__name card-preview__item">******</div><div class="bird-card__gen card-preview__item"></div><div class="bird-card__player card-preview__item">Loading...</div></div><div class="bird-card__description"></div>';

export default birdCardHTML;

const birdPlayerHTML = '<div class="player"><div class="player-controls"><button class="play player-icon"></button></div><div class="player-custom-ctrls"><input id="playBar" type="range" min="0" max="" step="0.001"><div class="volume-box"><div class="volume-icon"><img src="../../assets/icons/volume-low-svgrepo-com.svg" alt="volume"></div><div class="volume-bar"><div class="volume-current"></div></div></div><div class="play-time"><span class="cur-time">00:00</span><span> / </span><span class="total-dur">00:00</span></div></div><audio class="audio" src="#"></audio></div>';
export {birdPlayerHTML};
/* const birdInfoBlock = document.querySelector('.bird-card-info');
          birdInfoBlock.innerHTML = birdCardHTML;
          const birdCardImg = birdInfoBlock.querySelector('.bird-card__img');
          birdCardImg.src = key.image;
          birdCardImg.alt = `bird-img ${key.name}`;
          const birdCardName = birdInfoBlock.querySelector('.bird-card__name');
          birdCardName.textContent = key.name;
          const birdCardSpecies = birdInfoBlock.querySelector('.bird-card__gen');
          birdCardSpecies.textContent = key.species;
          const birdCardDescr = birdInfoBlock.querySelector('.bird-card__description');
          birdCardDescr.textContent = key.description; */
