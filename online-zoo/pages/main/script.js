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
    btnPop.style.position='absolute';
    btnPop.style.right='10px';
    btnPop.style.top='10px';
    btnPop.style.width='20px';
    btnPop.style.height='20px';
    btnPop.style.zIndex='150';

    btnPop.addEventListener('click',(e) => {
        if (!e.target.classList.contains('btn-cross')) {
            document.querySelector('.container .cover-pop-up').remove();
        }
    });

    }

}