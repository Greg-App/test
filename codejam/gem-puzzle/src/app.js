const initContentSet = {
    'controls': ['Reset saved', 'Start', 'Stop', 'Save', 'Results'],
    'options': [3, 4, 5, 6, 7, 8],
    'moves': 0,
    'time': 0,
    'size': 4,
    'savedMatrix': [],
    'result': {},
    'playState': false,
    'gameover': false

}

let currentSet = checkLocalStorage() ? checkLocalStorage() : JSON.parse(JSON.stringify(initContentSet));
currentSet.playState = false;
console.log(currentSet);

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
    const stop = document.querySelector('.Stop');
    stop.disabled = true;
    const moveSound = document.createElement('audio');
    moveSound.classList.add('movesound');
    moveSound.innerHTML = '<source src="../gem-puzzle/assets/audio/whoosh-grainy_gjknxkv_.mp3"> type="audio/mp3">';
    ctrlBox.append(moveSound);
    const bgSound = document.createElement('audio');
    bgSound.classList.add('bg-sound');
    bgSound.innerHTML = '<source src="../gem-puzzle/assets/audio/bg_music_corp_Umbrella.mp3"  type="audio/mp3">';
    /* <source src="../gem-puzzle/assets/audio/geroi-mecha-i-magii-3-tema-igry.mp3"  type="audio/mp3">  */
    bgSound.volume = 0.15;
    bgSound.autoplay = true;
    bgSound.loop = 'loop';
    ctrlBox.append(bgSound);
}

function createVolumeBtn() {
    const volumeBtn = document.createElement('div');
    volumeBtn.classList.add('volume-btn');
    const header = document.querySelector('.header');
    header.append(volumeBtn);
    const volBtnImg = document.createElement('img');
    volumeBtn.append(volBtnImg);
    volumeBtn.children[0].src = '../gem-puzzle/assets/icons/volume-low-svgrepo-com.svg';
}
createVolumeBtn();
const moveSound = document.querySelector('.movesound');
const bgSound = document.querySelector('.bg-sound');
const volumeBtn = document.querySelector('.volume-btn');
volumeBtn.addEventListener('click', mute);

function mute() {
    if (moveSound.muted === false) {
        moveSound.muted = true;
        bgSound.muted = true;
        volumeBtn.children[0].src = '../gem-puzzle/assets/icons/volume-off-svgrepo-com.svg';

    } else {
        moveSound.muted = false;
        bgSound.muted = false;
        volumeBtn.children[0].src = '../gem-puzzle/assets/icons/volume-low-svgrepo-com.svg';
    }
}


function createDashboard() {
    const dash = document.querySelector('.dashboard');
    dash.append(document.createElement('div'));
    dash.append(document.createElement('div'));
    dash.children[0].classList.add('dash-item');
    dash.children[0].classList.add('moves');
    let min = Math.floor(currentSet.time / 60);
    let sec = currentSet.time % 60;
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;

    dash.children[0].insertAdjacentHTML('afterbegin', `<span class="title">Moves:</span><span class="value">${currentSet.moves}</span>`);
    dash.children[1].insertAdjacentHTML('afterbegin', `<span class="title">Time: </span><span class="value">${min}:${sec}</span>`);


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
/*------Top 10 list--------------*/
function createTop10List() {
    document.body.insertAdjacentHTML('afterbegin', '<div class="top-list-cover"><div class="top-list"><button class="btn btn-back">Back</button><h4>Top 10 list</h4><ol class="top10list"></ol></div>');
}

function createTop10ListNote() {
    document.body.insertAdjacentHTML('afterbegin', '<div class="top-list-note-cover"><div class="top-list-note"><h4>Congratulations! You\'re in the top 10 list</h4><span>Enter your name</span><input type="text"><button class="btn btn-save-result">Save result</button></div></div>');
}
createTop10List();
createTop10ListNote();

function createTopListItem() {
    const topList = document.querySelector('.top10list');
    const listItem = document.createElement('li');
    listItem.classList.add('top10list-item');
}




/*----create tiles-----------*/
function isArrayValid(arr) {
    currentSet.size = parseInt(currentSet.size, 10);
    let n = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] !== arr.length) {
            n = n + arr.slice(i + 1, arr.length).filter((el) => (el < arr[i] && el !== arr.length)).length;
        }
    }
    if (currentSet.size % 2 !== 0) {
        console.log('number of row', currentSet.size + 1 - Math.ceil((arr.indexOf(arr.length) + 1) / currentSet.size));
        if (n % 2 !== 0) {
            console.log('array is INVALID ', arr);
            return false;
        } else {
            console.log('array is valid ', arr);
            return true;
        }
    } else {
        let rowNum = currentSet.size + 1 - Math.ceil((arr.indexOf(arr.length) + 1) / currentSet.size);
        if ((n % 2 !== 0 && rowNum % 2 === 0) || (n % 2 === 0 && rowNum % 2 !== 0)) {
            console.log('array is valid ', arr);
            return true;
        } else {
            console.log('array is INVALID ', arr);
            return false;
        }
    }
}

function shuffleArray(array) {
    let j;
    let temp;
    let arrayCopy = JSON.parse(JSON.stringify(array));
    for (var i = arrayCopy.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arrayCopy[j];
        arrayCopy[j] = arrayCopy[i];
        arrayCopy[i] = temp;
    }
    return arrayCopy;
}

function createRndomMatrix() {
    const validArr = new Array(currentSet.size * currentSet.size).fill(0).map((el, ind) => ind + 1);
    let curMatrix = [];
    let tempArray;
    tempArray = shuffleArray(validArr);
    while (!isArrayValid(tempArray)) {
        tempArray = shuffleArray(validArr);
    }
    for (let i = 0; i < currentSet.size; i++) {
        curMatrix.push(tempArray.splice(0, currentSet.size));
        currentSet.savedMatrix = JSON.parse(JSON.stringify(curMatrix));
    }
}

function createCurMatrix() {

    if (!localStorage.getItem('currentSet')) {
        createRndomMatrix();
        console.log('valid Array is ', currentSet.savedMatrix);
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
    const validArr = new Array(currentSet.size * currentSet.size).fill(0).map((el, ind) => ind + 1);

    validArr.forEach((el) => {
        const tile = document.createElement('div');
        tile.classList.add('item');
        tile.style.width = `${100/currentSet.size}%`;
        tile.style.height = `${100/currentSet.size}%`;
        tile.draggable = true;
        tile.append(document.createElement('span'));
        tile.children[0].classList.add('item__value');
        tile.children[0].textContent = el;
        gameField.append(tile);
    });
    gameField.lastElementChild.draggable = false;

    setTileOffset();

}
createTiles();
if (localStorage.getItem('currentSet')) {
    showCover();
}

const gameField = document.querySelector('.game-field');
gameField.addEventListener('click', moveTile);

gameField.addEventListener('dragstart', (e) => {

    if (e.target.closest('.item')) {
        e.dataTransfer.effectAllowed = "move";
        curItem = e.target.closest('.item');
        console.log(curItem);
    }
});
gameField.addEventListener('drop', (e) => {
    //e.preventDefault();

    if (e.target.closest('.item')) {
        //e.target.closest('.item').preventDefault();
        targetItem = e.target.closest('.item');
        console.log(targetItem);
    }
});
gameField.addEventListener('dragend', (e) => {
    //e.preventDefault();

    if (e.target.closest('.item') && targetItem.children[0].textContent == currentSet.size * currentSet.size) {
        console.log("moving to last child");
        curItem.classList.add('drag-transition');
        moveTile(e);
        setTimeout(() => curItem.classList.remove('drag-transition'), 300);
        //e.target.closest('.item').preventDefault();

    }
});
gameField.addEventListener('dragenter', (e) => {
    e.preventDefault();
    if (e.target.closest('.item')) {
        //e.target.closest('.item').preventDefault();
    }
});
gameField.addEventListener('dragleave', (e) => {
    //e.preventDefault();
    if (e.target.closest('.item')) {
        // e.target.closest('.item').preventDefault();
    }
});
gameField.addEventListener('dragover', (e) => {
    e.preventDefault();

    if (e.target.closest('.item')) {

        //e.target.closest('.item').preventDefault();
    }
});




function isMoveOk(target, empty) {
    if ((target[0] === empty[0] || target[1] === empty[1]) && (Math.abs(target[0] - empty[0]) === 1 || Math.abs(target[1] - empty[1]) === 1)) {
        return true;
    } else {
        return false;
    }
}

function moveTile(e) {
    if (e.target.closest('.item')&&!e.target.classList.contains('showBlock')) {
        console.log(e.target);
        const item = e.target.closest('.item');
        let gameField = document.querySelector('.game-field');
        let coorTarget = [item.dataset.x, item.dataset.y];
        let coorEmpty = [gameField.lastElementChild.dataset.x, gameField.lastElementChild.dataset.y];
        if (isMoveOk(coorTarget, coorEmpty)) {
            const moveSound = document.querySelector('.movesound');
            moveSound.play();
            setTimeout(() => {
                moveSound.pause();
                moveSound.currentTime = 0;
            }, 170);
            item.style.border = '2px solid yellow';
            item.style.filter = 'brightness(150%)';
            setTimeout(() => {
                item.style.removeProperty('border');
                item.style.removeProperty('filter');

            }, 300);
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
        ifWinGame();
    }
    
}

function ifWinGame() {
    const tileArr = document.querySelectorAll('.item');
    const validArr = new Array(currentSet.size * currentSet.size).fill(0).map((el, ind) => ind + 1);
    const playedArr = [];
    tileArr.forEach((el) => {
        playedArr.push(Number(el.dataset.tileNum));
    });
    //!!!
    if (playedArr.join('') !== validArr.join('')) {
        showCover();
        showWinMessage();
        stopGame();
        currentSet.gameover = true;
        console.log(currentSet);

        saveCurrResults();

    }
}

function saveCurrResults() {
    if (currentSet.time !== 0) {
        let topListSaved;
        currentSet.result = [{
            'name': '',
            'moves': currentSet.moves,
            'time': currentSet.time
        }];
        
            console.log('yes1');
         let savedList=JSON.parse(localStorage.getItem('top10List'));
        savedList.push(currentSet.result[0]);
        savedList.sort((a,b)=>a.time-b.time);
        console.log(savedList);
        console.log(currentSet.result[0].time);
        if(savedList.length<=10||(savedList[savedList.length-1].time!=currentSet.result[0].time)) {
            console.log('yes2');
            showEnterName();
        

        }

        
    }

}

function showEnterName() {
    const enterNameMenu = document.querySelector('.top-list-note-cover');
    enterNameMenu.style.transform = 'translateX(0%)';
}

function hideEnterName() {
    const enterNameMenu = document.querySelector('.top-list-note-cover');
    enterNameMenu.style.transform = 'translateX(-100%)';
}
const btnSaveResult = document.querySelector('.top-list-note .btn-save-result');
btnSaveResult.addEventListener('click', saveResults);

function saveResults() {
    const nameInput = document.querySelector('.top-list-note input');
    currentSet.result[0].name = nameInput.value ? nameInput.value : 'Player';
    nameInput.value = '';

    if (localStorage.getItem('top10List')) {
        let topListSaved = JSON.parse(localStorage.getItem('top10List'));
        console.log('before push', topListSaved);
        topListSaved.push(currentSet.result[0]);
        console.log('after push', topListSaved);
        topListSaved.sort((a, b) => a.time - b.time);
        topListSaved=topListSaved.splice(0,10);
        console.log('after sort', topListSaved);
        localStorage.setItem('top10List', JSON.stringify(topListSaved));
        updTopListHTML();
    } else {
        localStorage.setItem('top10List', JSON.stringify(currentSet.result));
        updTopListHTML();
    }
    hideEnterName();
    setTimeout(showTopList, 200);

}
updTopListHTML();
function updTopListHTML() {
    let topListSaved = JSON.parse(localStorage.getItem('top10List'));
    const topListHTML = document.querySelector('.top10list');
    topListHTML.replaceChildren();
    if (topListSaved) {
        topListSaved.forEach((el) => {
            const listItem = document.createElement('li');
            listItem.classList.add('top10list-item');
            let min = Math.floor(el.time / 60).toString();
            let sec = (el.time % 60).toString();
            min = min < 10 ? `0${min}` : min;
            sec = sec < 10 ? `0${sec}` : sec;
            listItem.textContent = `${el.name}  - moves: ${el.moves}, time: ${min}:${sec}`;
            topListHTML.append(listItem);
        });
    }
}

function showTopList() {
    const topList = document.querySelector('.top-list-cover');
    topList.style.transform = 'translateX(0%)';
}

function hideTopList() {
    const topList = document.querySelector('.top-list-cover');
    topList.style.transform = 'translateX(150%)';
}
const topList = document.querySelector('.top-list-cover');
topList.addEventListener('click', (e) => {
    if (e.target.className === 'top-list-cover') {
        hideTopList();
    }
});
const topListBtn = document.querySelector('.btn-back');
topListBtn.addEventListener('click', hideTopList);

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
        const currTime = document.querySelector('.time-left .value');

        winMsg.innerHTML = `<span>Hooray! You solved the puzzle in ${currTime.textContent} and ${currentSet.moves} moves!</span>`;
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
        const btnStart = document.querySelector('.Start');
        btnStart.disabled = false;
        const btnStop = document.querySelector('.Stop');
        btnStop.disabled = true;

    }
}

function updateTime() {
    const timeDisplay = document.querySelector('.time-left .value');
    let min = Math.floor(currentSet.time / 60).toString();
    let sec = (currentSet.time % 60).toString();
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    timeDisplay.textContent = `${min}:${sec}`;

}

function updateDashboard() {
    const movesDisplay = document.querySelector('.moves .value');
    movesDisplay.textContent = currentSet.moves;
    updateTime();
}

const controls = document.querySelector('.controls');
controls.addEventListener('click', doControls);

function doControls(e) {
    if (e.target.classList.contains('Save')) {
        saveGame();
    }
    if (e.target.classList.contains('Reset-saved')) {
        resetSavedGame();
    }
    if (e.target.classList.contains('Start')) {
        startGame();
    }

    if (e.target.classList.contains('Stop')) {
        stopGame();
    }
    if (e.target.classList.contains('Results')) {
        showTopList();
    }
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
    const curSize = currentSet.size;
    currentSet = JSON.parse(JSON.stringify(initContentSet));
    currentSet.size = curSize;
    createRndomMatrix();
    createTiles();
    updateDashboard();
    console.log(currentSet);
    const btnStart = document.querySelector('.Start');
    btnStart.disabled = false;
    const btnStop = document.querySelector('.Stop');
    btnStop.disabled = true;
}

function resetSavedGame() {
    resetGame();
    resetLocalSavedGame();
}

function resetLocalSavedGame() {
    localStorage.removeItem('currentSet');
}

function startGame() {
    removeCover();
    removeWinMessage();
    if (currentSet.time === 0) {
        currentSet.moves = 0;
        updateDashboard();
        timerGo();
    } else {
        if (currentSet.gameover === false) {
            timerGo();
        } else {
            resetGame();
            timerGo();

        }
    }
    const btnStart = document.querySelector('.Start');
    btnStart.disabled = true;
    const btnStop = document.querySelector('.Stop');
    btnStop.disabled = false;

}

function stopGame() {
    timerStop();
    showCover();
    const btnStart = document.querySelector('.Start');
    btnStart.disabled = false;
    const btnStop = document.querySelector('.Stop');
    btnStop.disabled = true;


}
timer();

function timerGo() {
    currentSet.playState = true;
}

function timerStop() {
    currentSet.playState = false;
}

function timer() {
    if (currentSet.playState === true) {
        currentSet.time++;
        console.log('timer ', currentSet.time);
        updateTime();
    }
    setTimeout(timer, 1000);
}





/*----Before unload----------*/
window.addEventListener('beforeunload', stopBeforeUnload);

function stopBeforeUnload() {
    hideTopList();
    hideEnterName();
    stopGame();

    if (localStorage.getItem('currentSet')) {
        const temp = JSON.parse(localStorage.getItem('currentSet'));
        temp.playState = false;
        localStorage.setItem('currentSet', JSON.stringify(temp));

    }

}