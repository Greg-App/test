/* function ifValidMain () {
   
    if (inputEmail.validity.valid==='true'||inputEmail.textContent==='') {
        inputEmail.classList.add('invalid-input');
        inputEmail.classList.remove('valid-input');
        inputBtn.classList.add('invalid-btn');
        inputBtn.classList.remove('valid-btn');

    } else if (inputEmail.validity.valid==='true'||inputEmail.textContent!=='') {
        inputEmail.classList.add('valid-input');
        inputEmail.classList.remove('invalid-input');
        inputBtn.classList.add('valid-btn');
        inputBtn.classList.remove('invalid-btn');
    }
    else if (inputEmail.validity.valid==='false') {
        inputEmail.classList.add('invalid-input');
        inputEmail.classList.remove('valid-input');
        inputBtn.classList.add('invalid-btn');
        inputBtn.classList.remove('valid-btn');
    }
}
ifValidMain ();

function ifValidInput (e) {
if (e.target.classList.has('footer-email')&&e.target.type==='email') {
    ifValidMain ();
}
}

function ifValidBtn (e) {
    if (e.target.classList.has('footer-email')&&e.target.type==='submit') {
        ifValidMain ();
    }
    }
    let inputEmail = document.querySelector('#email');
    let inputBtn = document.querySelector('.btn-submit');
    inputBtn.addEventListener ('click',ifValidMain);
document.body.addEventListener ('focusin',ifValidMain);
document.body.addEventListener ('focusout',ifValidMain); */

/*-----burger menu interaction-------------*/
const burgerMenu = document.querySelector(".burger-menu");
const siteCover = document.querySelector(".cover");
const burgerCross = document.querySelector(".btn-cross");
const burgerBtn = document.querySelector(".burger-btn");
burgerBtn.addEventListener('click', showMenu);
siteCover.addEventListener('click', hideMenu);
burgerCross.addEventListener('click', hideMenu);

function showMenu() {
    if (!burgerMenu.classList.contains('burger-active')) {
        burgerMenu.classList.add('burger-active');
        siteCover.classList.add('enable');
    } else {
        burgerMenu.classList.remove('burger-active');
        siteCover.classList.remove('enable');
    }
}

function hideMenu() {
    if (burgerMenu.classList.contains('burger-active')) {
        burgerMenu.classList.remove('burger-active');
        siteCover.classList.remove('enable');
    }
}
/*-----burger menu interaction-----END--------*/

/*-----testimonials slider--------------------*/

const input = document.querySelector('.progress-bar-main');
const commentsBox = document.querySelector('.comments');
const commentItems = document.querySelectorAll('.comments .comment-item');
const comProgBar = document.querySelector('.progress-bar-main');
let curInputVal = 0;
input.value = 0;
comProgBar.addEventListener('change', shiftComments);
window.addEventListener('resize', setComBarRange);

function setComBarRange() {

    if (window.innerWidth > 1128) {
        input.setAttribute('max', commentItems.length - 1 - 3);
        input.setAttribute('value', `${curInputVal}`);
        shiftComments();

    } else if (window.innerWidth <= 1128) {
        input.setAttribute('max', commentItems.length - 1 - 2);
        input.setAttribute('value', `${curInputVal}`);
        shiftComments();
    } else {}

}
setComBarRange();

function shiftComments() {
    commentItems.forEach((el) => {
        curInputVal = input.value;
        if (window.innerWidth > 1128) {
            el.style.left = `${-(23.09+2.5)*comProgBar.value}%`;
        } else if (window.innerWidth > 868 && window.innerWidth <= 1128) {
            el.style.left = `${(-(31.1702+3.1914)*comProgBar.value)}%`;
        } else {
            el.style.left = '0';
            input.setAttribute('value', `0`);
            curInputVal = 0;
        };

    });
}
/*-----testimonials slider---END-----------------*/

/*----comments pop-up-------*/

commentsBox.addEventListener('click', showPopUp);

function showPopUp(e) {
    if (e.target.classList.contains('comment-item') && window.innerWidth <= 868) {
        const testimonContainer = document.querySelector('.testimonials .container');

        if (document.querySelector('.container .cover-pop-up')) {
            document.querySelector('.container .cover-pop-up').remove();
        }
        const popUpWrap = document.createElement('div');
        popUpWrap.classList.add('cover-pop-up');
        const cloneComment = e.target.cloneNode(true);
        testimonContainer.prepend(popUpWrap);
        cloneComment.classList.remove('comment-item');
        cloneComment.classList.add('comment-item-popup');
        popUpWrap.append(cloneComment);
        popUpWrap.addEventListener('click', (e) => {
            if (!e.target.classList.contains('comment-item-popup')) {
                document.querySelector('.container .cover-pop-up').remove();
            }
        });
        const btnPop = document.querySelector('.btn-cross').cloneNode(true);
        popUpWrap.prepend(btnPop);
        btnPop.style.position = 'absolute';
        btnPop.style.right = '10px';
        btnPop.style.top = '10px';
        btnPop.style.width = '20px';
        btnPop.style.height = '20px';
        btnPop.style.zIndex = '150';

        btnPop.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn-cross')) {
                document.querySelector('.container .cover-pop-up').remove();
            }
        });

    }

}


/*-----Pets slider------------------*/
const petCardsDef = [{
        name: 'GIANT PANDAS',
        origin: 'Native to Southwest China',
        mealsrc: '../../assets/icons/main/banana-bamboo_icon.svg',
        mealalt: 'banana-bamboo_icon',
        foto: '../../assets/images/main/1_Pandas.png'
    },
    {
        name: 'EAGLES',
        origin: 'Native to South America',
        mealsrc: '../../assets/icons/main/meet-fish_icon.svg',
        mealalt: 'meet-fish_icon',
        foto: '../../assets/images/main/2_Eagles.png'
    },
    {
        name: 'GORILLAS',
        origin: 'Native to Congo',
        mealsrc: '../../assets/icons/main/banana-bamboo_icon.svg',
        mealalt: 'banana-bamboo_icon',
        foto: '../../assets/images/main/3_Gorillas.png'
    },
    {
        name: 'TWO-TOED SLOTH',
        origin: 'Mesoamerica, South America',
        mealsrc: '../../assets/icons/main/banana-bamboo_icon.svg',
        mealalt: 'banana-bamboo_icon',
        foto: '../../assets/images/main/4_Sloth.png'
    },
    {
        name: 'CHEETAHS',
        origin: 'Native to Africa',
        mealsrc: '../../assets/icons/main/meet-fish_icon.svg',
        mealalt: 'meet-fish_icon',
        foto: '../../assets/images/main/5_Cheetas.png'
    },
    {
        name: 'PENGUINS',
        origin: 'Native to Antarctica',
        mealsrc: '../../assets/icons/main/meet-fish_icon.svg',
        mealalt: 'meet-fish_icon',
        foto: '../../assets/images/main/6_Penguins.png'
    },
    {
        name: 'ALLIGATORS',
        origin: 'Native to Southeastern U. S.',
        mealsrc: '../../assets/icons/main/meet-fish_icon.svg',
        mealalt: 'meet-fish_icon',
        foto: '../../assets/images/main/7_Alligators.png'
    },

];

function removeCards() {
    const petCards = document.querySelectorAll('.pet-card');
    petCards.forEach((el) => {
        el.remove();
    });
}

function createCard(card) {
    const petBox = document.querySelector('.pets-box');
    const petCard = document.createElement('div');
    petCard.classList.add('pet-card');
    petCard.style.display='none';
    petBox.append(petCard);
    const petFade = document.createElement('div');
    petFade.classList.add('card-fade');
    petCard.append(petFade);
    const petFoto = document.createElement('div');
    petFoto.classList.add('pet-foto');
    petCard.append(petFoto);
    const petTitle = document.createElement('div');
    petTitle.classList.add('pet-title');
    petCard.append(petTitle);

    petFoto.append(document.createElement('img'));
    petFoto.children[0].setAttribute('src', `${card.foto}`);

    petTitle.append(document.createElement('div'));
    petTitle.children[0].classList.add('pet-title-text');
    petTitle.children[0].append(document.createElement('p'));
    petTitle.children[0].append(document.createElement('p'));
    petTitle.children[0].children[0].classList.add('small-p');
    petTitle.children[0].children[1].classList.add('small-p');
    petTitle.children[0].children[0].textContent = `${card.name}`;
    petTitle.children[0].children[1].textContent = `${card.origin}`;
    petTitle.append(document.createElement('div'));
    petTitle.children[1].classList.add('pet-title-icon');
    petTitle.children[1].append(document.createElement('img'));
    petTitle.children[1].children[0].classList.add('banan');
    petTitle.children[1].children[0].setAttribute('src', `${card.mealsrc}`);
    petTitle.children[1].children[0].setAttribute('alt', `${card.mealalt}`);
}

function createCardSet() {
    const arr = shuffle(petCardsDef);
    for (let i = 0; i < 6; i++) {
        createCard(arr[i]);
    }
}

function shuffle(array) {
    let arr = [...array];
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function moveSlides(e) {
    const petBox = document.querySelector('.pets-box');
    petBox.setAttribute("style",`width:${petBox.offsetWidth}px; height:${petBox.offsetHeight}px`);
    
    
    
    removeCards();
    
    createCardSet();
   
    
    if (e.target.classList.contains('pets-btn-right') || e.target.classList.contains('img-btn-arrow-right')) {
        const petCards = document.querySelectorAll('.pet-card');
        petCards.forEach((el) => {
            if (window.innerWidth > 921) {
                petBox.style.transform='translateX(330%)';
                el.style.transform = 'translateX(330%)';
                el.style.transition='0.7s';
                el.style.display='flex';
            } else {
                el.style.transform = 'translateX(230%)';
                el.style.transition='0.7s';
                el.style.display='flex';
            }
        });
        hideCards(widthMedia.matches);
        setTimeout(()=>{
            const petCards = document.querySelectorAll('.pet-card');
        petCards.forEach((el) => {    
            el.style.transition='0.7s';           
                el.style.transform = 'translateX(0%)';
                const petBox = document.querySelector('.pets-box');
    petBox.setAttribute("style",`width:auto; height:auto`);
        });
    },200);

    }
    if (e.target.classList.contains('pets-btn-left') || e.target.classList.contains('img-btn-arrow-left')) {
        
        const petCards = document.querySelectorAll('.pet-card');
        petCards.forEach((el) => {
            if (window.innerWidth > 921) {
                petBox.style.transform='translateX(-330%)';
                el.style.transform = 'translateX(-330%)';
                el.style.transition='0.7s';
                el.style.display='flex';
            } else {
                petBox.style.transform='translateX(-230%)';
                el.style.transform = 'translateX(-230%)';
                el.style.transition='0.7s';
                el.style.display='flex';
            }
        });
        hideCards(widthMedia.matches);
        setTimeout(()=>{
            const petCards = document.querySelectorAll('.pet-card');
        petCards.forEach((el) => {  
           
            el.style.transition='0.7s';           
                el.style.transform = 'translateX(0%)';
                const petBox = document.querySelector('.pets-box');
                petBox.setAttribute("style",`width:auto; height:auto`);  
        });
    },200);

    }
    /* petBox.style.width='100%';
    petBox.style.height='100%'; */
    petBox.style.transform='translateX(0%)';
    

}
const rightBtn = document.querySelector('.pets-btn-right');
rightBtn.addEventListener('click', moveSlides);
const leftBtn = document.querySelector('.pets-btn-left');
leftBtn.addEventListener('click', moveSlides);

const widthMedia = window.matchMedia('(max-width: 921px)');

function hideCards(widthCheck) {
    const petCards = document.querySelectorAll('.pet-card');
    
    if (widthCheck) {
    petCards[4].style.display='none';
    petCards[5].style.display='none';
  } else {
    petCards[4].style.display='flex';
    petCards[5].style.display='flex';
  }
}
hideCards(widthMedia.matches);
widthMedia.addEventListener('change',(e)=> {
    hideCards(e.matches);
});

