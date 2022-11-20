const dictQuiz = {
  en: {
    score:'Score',
    nav: ['Training','Old World sparrow', 'Forest birds','Songbirds','Birds of Prey','Sea birds'],
    infoBlock: 'Listen to current bird song<br>Choose the bird from the list',
    nextLevelBtn: 'Next Level',
    backBtn: 'Back',
    winNote: ['Game over', 'redirecting to results\nin few seconds . . .']
  },
  ru: {
    score:'Баллы',
    nav: ['Тренировка','Воробьиные', 'Лесные птицы','Певчие птицы','Хищные птицы','Морские птицы'],
    infoBlock: 'Послушайте плеер.<br>Выберите птицу из списка',
    nextLevelBtn: 'Следующий уровень',
    backBtn: 'Назад',
    winNote: ['Игра окончена', 'переход к результатам\nчерез несколько секунд . . .']
  }
};
const dictStart = {
  en: {
    nav: ['Start game','Results', 'Gallery'],
    title: 'Quiz game',
    subtitle: 'How a bird sings',
    description:'Listen to different bird voice records and try to guess the name of the bird'
  },
  ru: {
    nav: ['Начать игру','Результаты', 'Галерея'],
    title: 'Игра викторина',
    subtitle: 'Как поет птица',
    description:'Слушайте записи голосов различных птиц и угадывайте название птицы'
  }
};
const dictResult = {
  en: {
    nav: ['Play again','Start menu'],
    title: 'Results',
    descript: 'Score:',
    description: 'Press "Play again" in the menu above to play again',
    maxScore:'Congratulation! You win the game! you hit the maximum score.'
  },
  ru: {
    nav: ['Играть снова','На главную'],
    title: 'Результаты',
    descript: 'Ваши баллы:',
    description:'Для повторной игры нажмите "Играть снова" в меню выше',
    maxScore: 'Поздравляем! Вы прошли игру! У вас максимальное количество баллов.'
  }
};

export  {dictQuiz,dictStart,dictResult};