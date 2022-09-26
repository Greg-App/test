function ifValidMain () {
   
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
document.body.addEventListener ('focusout',ifValidMain);