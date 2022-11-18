
const scoreBox = document.querySelector('.score');
const score = localStorage.getItem('songbird-score');
scoreBox.textContent = `${score} / 30`;


