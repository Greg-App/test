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


/*--------Donate scale----------*/

const cashInput = document.querySelector('.amount');
const defCash = ['25', '50', '100', '250', '500', '1000', '2000', '5000'];
const dotBox = document.querySelector('.dot-box');
dotBox.addEventListener('click', setDefCash);

function setDefCash(e) {
    if (e.target.className === 'dot') {
        const oldDot = document.querySelector('.dot-active');
        if (oldDot) {
            oldDot.classList.remove('dot-active');
        }
        cashInput.value = e.target.children[0].textContent;
        e.target.classList.add('dot-active');
    }
}
cashInput.addEventListener('input', setDotActive);
function setDotActive() {
    const oldDot = document.querySelector('.dot-active');
    if(oldDot){oldDot.classList.remove('dot-active');}
    if (defCash.includes(cashInput.value)) {
        const dotArr = document.querySelectorAll('.dot');
        dotArr.forEach((el) => {
            if (el.children[0].textContent === cashInput.value) {
                el.classList.add('dot-active');
            }
        });
    }
}
cashInput.addEventListener('input', checkInputLength);

function checkInputLength () {
    if(cashInput.value.length>4) {
        cashInput.value=cashInput.value.slice(0,4);
    }
}