const initContentSet = {
    'controls': ['Shuffle and start', 'Stop', 'Save', 'Results'],
    'options': [3, 4, 5, 6, 7, 8],
    'moves': 0,
    'time': '00:00',
    'size': 4
}

function checkLocalStorage() {
    const cur = JSON.parse(localStorage.getItem('currentSet'));
    return (cur || cur !== '') ? cur : undefined;
}
const currentSet = checkLocalStorage() ? checkLocalStorage() : JSON.parse(JSON.stringify(initContentSet));


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
        dash.children[0].insertAdjacentHTML('afterbegin',`<span class="title">Moves:</span><span class="value">${currentSet.moves}</span>`);
        dash.children[1].insertAdjacentHTML('afterbegin',`<span class="title">Time: </span><span class="value">${currentSet.time}</span>`);       
        dash.children[1].classList.add('dash-item');
        dash.children[1].classList.add('time-left');
    
}
createDashboard();
function createInfo() {
    const info = document.querySelector('.game-info');
        info.append(document.createElement('span'));
        info.append(document.createElement('span'));
        info.children[0].textContent=`Frame size: `;
        info.children[1].textContent=`${currentSet.size}x${currentSet.size}`;
        info.children[1].classList.add('info-size-value');
}
createInfo();
function createOptions() {
    const optBox = document.querySelector('.game-options');
    optBox.prepend(document.createElement('span'));
    optBox.children[0].textContent='Other sizes: ';
    const sizeList =document.createElement('ul');
    const optNav = document.querySelector('.nav'); 
    optNav.append(sizeList);
    sizeList.classList.add('sizes-list');
        
    currentSet.options.forEach((el) => {
        const listItem = document.createElement('li');
        listItem.classList.add('sizes-item');
        listItem.dataset.size=el;
        
        if(listItem.dataset.size==currentSet.size) {
            listItem.classList.add('size-active');
        }
        listItem.append(document.createElement('a'));
        listItem.children[0].textContent=`${el}x${el}`;
        listItem.children[0].setAttribute('href',' ');
        sizeList.append(listItem);

    });
}
createOptions();