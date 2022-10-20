const initContentSet = {
    'controls': ['Shuffle and start', 'Stop', 'Save', 'Results'],
    'options': [3, 4, 5, 6, 7, 8],
    'moves': 0,
    'time': '00:00',
    'size': 4
}
const currentSet = checkLocalStorage() ? checkLocalStorage() : JSON.parse(JSON.stringify(initContentSet));

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

function setTileOffset() {
    const validArr = new Array(currentSet.size * currentSet.size).fill(0).map((el, ind) => ind + 1);
    const curMatrix = [];
    for (let i = 0; i < currentSet.size; i++) {
        curMatrix.push(shuffleArray(validArr).splice(0, currentSet.size));
    }
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
    gameField.replaceChildren();
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
        winMsg.innerHTML = '<span>You<br>WIN!!!</span>';
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
        const oldAcvSize=document.querySelector('.size-active');
        oldAcvSize.classList.remove('size-active');
        e.target.parentElement.classList.add('size-active');
       currentSet.size=e.target.textContent[0];
       createTiles();
       const infoSize=document.querySelector('.info-size-value');
       infoSize.textContent=e.target.textContent;
       
    }
}