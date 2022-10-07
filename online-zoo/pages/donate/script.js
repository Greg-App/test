const burgerMenu = document.querySelector (".burger-menu");
const siteCover = document.querySelector(".cover");
const burgerCross = document.querySelector(".btn-cross");
const burgerBtn = document.querySelector(".burger-btn");
burgerBtn.addEventListener('click',showMenu);
siteCover.addEventListener('click',hideMenu);
burgerCross.addEventListener('click',hideMenu);
function showMenu () {
    if (!burgerMenu.classList.contains('burger-active')) {
        burgerMenu.classList.add('burger-active');
        siteCover.classList.add('enable');
    } else {
        burgerMenu.classList.remove('burger-active');
        siteCover.classList.remove('enable');
    }
}
function hideMenu () {
    if (burgerMenu.classList.contains('burger-active')) {
        burgerMenu.classList.remove('burger-active');
        siteCover.classList.remove('enable');
    }
}