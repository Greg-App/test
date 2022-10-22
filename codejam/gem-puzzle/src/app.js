const initContentSet = {
    'controls': ['Reset', 'Start', 'Stop', 'Save', 'Results'],
    'options': [3, 4, 5, 6, 7, 8],
    'moves': 0,
    'time': '00:00',
    'size': 4,
    'savedMatrix': [],
    'top10list': []

}

let currentSet = checkLocalStorage() ? checkLocalStorage() : JSON.parse(JSON.stringify(initContentSet));

function checkLocalStorage() {
    const cur = JSON.parse(localStorage.getItem('currentSet'));
    return (cur || cur !== '') ? cur : undefined;
}


//create site structure and default content
function createSiteStructure() {
    document.body.insertAdjacentHTML('afterbegin', '<h1>Gem puzzle game</h1></h1><div class="game-wrapper"><div class="header"><div class="controls"></div><div class="dashboard"></div></div><div class="game-field"></div><div class="game-info"></div><div class="game-options"><nav class="nav"></nav></nav></div></div>');
    createControls();
}
createSiteStructure();

function createControls() {
    const ctrlBox = document.querySelector('.controls');
    currentSet.controls.forEach((el) => {
        const ctrlBtn = document.createElement('button');
        ctrlBox.append(ctrlBtn);
        ctrlBtn.classList.add('btn');
        ctrlBtn.classList.add(`${el.replace(/ /g, "-")}`);
        ctrlBtn.textContent = el;
    });
    const moveSound = document.createElement('audio');
    moveSound.classList.add('movesound');
    moveSound.innerHTML='<source src="../gem-puzzle/assets/audio/whoosh-grainy_gjknxkv_.mp3"> type="audio/mp3">';
    ctrlBox.append(moveSound);
}
function createVolumeBtn () {
    //const volumeBtn = document.querySelector('.volume-icon img');
    const volumeBtn = document.createElement('div');
    volumeBtn.classList.add('volume-btn');
    document.body.prepend(volumeBtn);
    const volBtnImg = document.createElement('img');
    volumeBtn.append(volBtnImg);
    volumeBtn.children[0].src='../gem-puzzle/assets/icons/volume-low-svgrepo-com.svg';
}
createVolumeBtn();
const moveSound = document.querySelector('.movesound');
const volumeBtn = document.querySelector('.volume-btn');
volumeBtn.addEventListener('click',mute);
function mute() {
    if(moveSound.muted===false) {
    moveSound.muted=true;
    volumeBtn.children[0].src='../gem-puzzle/assets/icons/volume-off-svgrepo-com.svg';

} 
    else {
        moveSound.muted=false;
        volumeBtn.children[0].src='../gem-puzzle/assets/icons/volume-low-svgrepo-com.svg';
    }
}


function createDashboard() {
    const dash = document.querySelector('.dashboard');
    dash.append(document.createElement('div'));
    dash.append(document.createElement('div'));
    dash.children[0].classList.add('dash-item');
    dash.children[0].classList.add('moves');
    dash.children[0].insertAdjacentHTML('afterbegin', `<span class="title">Moves:</span><span class="value">${currentSet.moves}</span>`);
    dash.children[1].insertAdjacentHTML('afterbegin', `<span class="title">Time: </span><span class="value">${currentSet.time}</span>`);
    dash.children[1].classList.add('dash-item');
    dash.children[1].classList.add('time-left');

}
createDashboard();

function createInfo() {
    const info = document.querySelector('.game-info');
    info.append(document.createElement('span'));
    info.append(document.createElement('span'));
    info.children[0].textContent = `Frame size: `;
    info.children[1].textContent = `${currentSet.size}x${currentSet.size}`;
    info.children[1].classList.add('info-size-value');
}
createInfo();

function createOptions() {
    const optBox = document.querySelector('.game-options');
    optBox.prepend(document.createElement('span'));
    optBox.children[0].textContent = 'Other sizes: ';
    const sizeList = document.createElement('ul');
    const optNav = document.querySelector('.nav');
    optNav.append(sizeList);
    sizeList.classList.add('sizes-list');

    currentSet.options.forEach((el) => {
        const listItem = document.createElement('li');
        listItem.classList.add('sizes-item');
        listItem.dataset.size = el;

        if (listItem.dataset.size == currentSet.size) {
            listItem.classList.add('size-active');
        }
        listItem.append(document.createElement('a'));
        listItem.children[0].textContent = `${el}x${el}`;
        listItem.children[0].classList.add('size-btn');
        listItem.children[0].setAttribute('href', '#!');
        sizeList.append(listItem);

    });
}
createOptions();

function shuffleArray(array) {
    let j;
    let temp;
    for (var i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
    }
    return array;

}

function createRndomMatrix() {
    const validArr = new Array(currentSet.size * currentSet.size).fill(0).map((el, ind) => ind + 1);
    let curMatrix = [];
    for (let i = 0; i < currentSet.size; i++) {
        curMatrix.push(shuffleArray(validArr).splice(0, currentSet.size));
        currentSet.savedMatrix = JSON.parse(JSON.stringify(curMatrix));
    }
}

function createCurMatrix() {

    if (!localStorage.getItem('currentSet')) {
        createRndomMatrix();
    } else {
        currentSet = JSON.parse(localStorage.getItem('currentSet'));
    }
}
createCurMatrix();

function setTileOffset() {
    let curMatrix = JSON.parse(JSON.stringify(currentSet.savedMatrix));
    //console.log(curMatrix);
    const tileArr = document.querySelectorAll('.item');
    const a = [];
    tileArr.forEach((el) => {
        a.push(el.firstElementChild.textContent);
    });
    //console.log(a);
    let k = 1;
    for (let i = 0; i < currentSet.size; i++) {
        for (let j = 0; j < currentSet.size; j++) {

            tileArr[curMatrix[i][j] - 1].style.transform = `translate(${j*100}%,${i*100}%)`;
            tileArr[curMatrix[i][j] - 1].dataset.x = j;
            tileArr[curMatrix[i][j] - 1].dataset.y = i;
            //console.log(curMatrix[i][j]);
            //console.log(tileArr[curMatrix[i][j] - 1]);
            tileArr[curMatrix[i][j] - 1].dataset.tileNum = k;
            k++;
        }
    }


}

function createTiles() {
    const gameField = document.querySelector('.game-field');
    const oldItems = document.querySelectorAll('.item');
    oldItems.forEach((el) => el.remove());
    const afetdeleteItems = document.querySelectorAll('.item');
    console.log(afetdeleteItems);
    const validArr = new Array(currentSet.size * currentSet.size).fill(0).map((el, ind) => ind + 1);

    validArr.forEach((el) => {
        const tile = document.createElement('div');
        tile.classList.add('item');
        tile.style.width = `${100/currentSet.size}%`;
        tile.style.height = `${100/currentSet.size}%`;
        tile.append(document.createElement('span'));
        tile.children[0].classList.add('item__value');
        tile.children[0].textContent = el;
        gameField.append(tile);
    });
    setTileOffset();
}
createTiles();

const gameField = document.querySelector('.game-field');
gameField.addEventListener('click', moveTile);

function isMoveOk(target, empty) {
    if ((target[0] === empty[0] || target[1] === empty[1]) && (Math.abs(target[0] - empty[0]) === 1 || Math.abs(target[1] - empty[1]) === 1)) {
        return true;
    } else {
        return false;
    }
}

function moveTile(e) {
    if (e.target.closest('.item')) {
        const item = e.target.closest('.item');
        let gameField = document.querySelector('.game-field');
        let coorTarget = [item.dataset.x, item.dataset.y];
        let coorEmpty = [gameField.lastElementChild.dataset.x, gameField.lastElementChild.dataset.y];
        if (isMoveOk(coorTarget, coorEmpty)) {
            const moveSound = document.querySelector('.movesound');
            moveSound.play();
            setTimeout(()=>{
                moveSound.pause();
                moveSound.currentTime=0;
            },170);
            item.style.border='2px solid yellow';
            item.style.filter='brightness(150%)';
            setTimeout(()=>{
                item.style.removeProperty('border');
                item.style.removeProperty('filter');
        
        },300);
            let temp;
            temp = coorTarget;
            coorTarget = coorEmpty;
            coorEmpty = temp;
            item.dataset.x = coorTarget[0];
            item.dataset.y = coorTarget[1];
            let temp1 = item.dataset.tileNum;
            item.dataset.tileNum = gameField.lastElementChild.dataset.tileNum;
            gameField.lastElementChild.dataset.tileNum = temp1;
            item.style.transform = `translate(${coorTarget[0]*100}%,${coorTarget[1]*100}%)`;
            gameField.lastElementChild.dataset.x = coorEmpty[0];
            gameField.lastElementChild.dataset.y = coorEmpty[1];
            gameField.lastElementChild.style.transform = `translate(${coorEmpty[0]*100}%,${coorEmpty[1]*100}%)`;
            currentSet.moves += 1;
            const movesDisplay = document.querySelector('.moves .value');
            movesDisplay.textContent = currentSet.moves;
            console.log(currentSet);
        }
    }
    ifWinGame();
}

function ifWinGame() {
    const tileArr = document.querySelectorAll('.item');
    const validArr = new Array(currentSet.size * currentSet.size).fill(0).map((el, ind) => ind + 1);
    const playedArr = [];
    tileArr.forEach((el) => {
        playedArr.push(Number(el.dataset.tileNum));
    });
    //!!!
    if (playedArr.join('') === validArr.join('')) {
        showCover();
        showWinMessage();
    }
}

function showCover() {
    if (!document.querySelector('.cover')) {
        const gameField = document.querySelector('.game-field');
        const cover = document.createElement('div');
        cover.classList.add('cover');
        gameField.prepend(cover);
        setTimeout(() => cover.classList.add('showBlock'), 200);

    }
}

function removeCover() {
    if (document.querySelector('.cover')) {
        const cover = document.querySelector('.cover');
        cover.remove();
    }
}

function showWinMessage() {
    if (!document.querySelector('.win-msg')) {
        const gameField = document.querySelector('.game-field');
        const winMsg = document.createElement('div');
        winMsg.classList.add('win-msg');
        winMsg.innerHTML = `<span>Hooray! You solved the puzzle in ${currentSet.time} and ${currentSet.moves} moves!</span>`;
        gameField.prepend(winMsg);
        setTimeout(() => winMsg.classList.add('showBlock'), 200);
    }
}

function removeWinMessage() {
    if (document.querySelector('.win-msg')) {
        const winMsg = document.querySelector('.win-msg');
        winMsg.remove();
    }
}

/* const controls = document.querySelector('.controls');
controls.addEventListener('click', stopGame); */

const sizesList = document.querySelector('.sizes-list');
sizesList.addEventListener('click', chooseSize);

function chooseSize(e) {
    if (e.target.classList.contains('size-btn')) {
        const oldAcvSize = document.querySelector('.size-active');
        oldAcvSize.classList.remove('size-active');
        e.target.parentElement.classList.add('size-active');
        if (localStorage.getItem('currentSet')) {
            console.log("1");
            if (JSON.parse(localStorage.getItem('currentSet')).size === e.target.textContent[0]) {
                console.log('1.1');
                currentSet = JSON.parse(localStorage.getItem('currentSet'));
            } else {
                console.log('1.2');
                currentSet = JSON.parse(JSON.stringify(initContentSet));
                currentSet.size = e.target.textContent[0];
                createRndomMatrix();
                console.log('change size');
                console.log(currentSet);
            }
        } else {
            console.log('2');
            currentSet = JSON.parse(JSON.stringify(initContentSet));
            currentSet.size = e.target.textContent[0];
            createRndomMatrix();

            /* currentSet.moves=0;
            const movesDisplay= document.querySelector('.moves .value');
            movesDisplay.textContent=0; */
        }
        console.log(currentSet);
        createTiles();
        console.log(currentSet);
        updateDashboard();
        const infoSize = document.querySelector('.info-size-value');
        infoSize.textContent = e.target.textContent;
        removeCover();
        removeWinMessage();

    }
}

function updateDashboard() {
    const movesDisplay = document.querySelector('.moves .value');
    movesDisplay.textContent = currentSet.moves;
    const timeDisplay = document.querySelector('.time-left .value');
    timeDisplay.textContent = currentSet.time;
}

const controls = document.querySelector('.controls');
controls.addEventListener('click', doControls);

function doControls(e) {
    if (e.target.classList.contains('Save')) {
        saveGame();
    }
    if (e.target.classList.contains('Reset')) {
        resetGame();
    }
    /* if(e.target.classList.contains('Stop')) {
        stopGame();
    }
    
    if(e.target.classList.contains('Save')) {
        showResults();
    } */
}

function saveGame() {
    const tileArr = document.querySelectorAll('.item');
    const curTileNumArr = [];
    tileArr.forEach((el) => {
        curTileNumArr.push(Number(el.dataset.tileNum));
    });
    console.log(curTileNumArr);
    const curMatrix = new Array(Number(currentSet.size)).fill('4').map((el, ind, arr) => arr[ind] = new Array(Number(currentSet.size)).fill('4'));
    console.log(curMatrix);
    curTileNumArr.forEach((el, ind) => {
        console.log('el ', el);
        console.log(Math.floor(el / currentSet.size));
        console.log(Math.floor(el % currentSet.size));
        curMatrix[Math.floor((el - 1) / currentSet.size)][Math.floor((el - 1) % currentSet.size)] = ind + 1;

    });
    currentSet.savedMatrix = JSON.parse(JSON.stringify(curMatrix));
    localStorage.setItem('currentSet', JSON.stringify(currentSet));
    console.log(currentSet);
}

function resetGame() {
    removeCover();
    removeWinMessage();
    const curSize=currentSet.size;
    currentSet=JSON.parse(JSON.stringify(initContentSet));
    currentSet.size=curSize;
    createRndomMatrix();
    createTiles();
    updateDashboard();
    console.log(currentSet);
}