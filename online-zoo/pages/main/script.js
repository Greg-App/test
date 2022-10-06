console.log('На некоторых разрешениях в некоторых карточках есть расхождения.\n Я сознательно не стал их кастомизировать,\n тк явно это ошибка макета.\n Не могут быть у карточек внутри одного блока разные отступы, или размеры. \n Текст тоже разный, сначала пытался соответствовать, но это тоже неправильно когда у одного и того же юзера\n на разных разрешениях разный текст');

alert('Все готово, кроме donate блока (pick and fed a friend)\n на 320px. 06.10 в середине дня доделаю');

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