window.addEventListener('DOMContentLoaded', () => {

const body = document.body;

let savedNumbers = localStorage.getItem('savedGame').split(',');

//название игры
const gameName = document.createElement('p');
gameName.classList.add('game-name');
gameName.textContent = 'Gem puzzle';
body.append(gameName);

//кнопки (настройки)
const buttons = document.createElement('div');
buttons.classList.add('buttons');
const buttonStart = document.createElement('button');
buttonStart.classList.add('button');
buttonStart.textContent = 'Размешать и начать';
buttons.append(buttonStart);
const buttonStop = document.createElement('button');
buttonStop.classList.add('button');
buttonStop.textContent = 'Стоп';
buttons.append(buttonStop);
const buttonSave = document.createElement('button');
buttonSave.classList.add('button');
buttonSave.textContent = 'Сохранить';
buttons.append(buttonSave);
const buttonResult = document.createElement('button');
buttonResult.classList.add('button');
buttonResult.textContent = 'Результаты';
buttons.append(buttonResult);
body.append(buttons);

//время игры и количество ходов
let movesValue = 0;

const gameData = document.createElement('div');
gameData.classList.add('game-data');
const moves = document.createElement('div');
moves.classList.add('moves');
moves.textContent = `Ходов: ${movesValue}`;
gameData.append(moves);
const time = document.createElement('div');
time.classList.add('time');
time.textContent = 'Время: ';
gameData.append(time);
const timeNode = document.createElement('span');
timeNode.classList.add('time', 'timeNode');
timeNode.textContent = '00:00';
time.append(timeNode);
body.append(gameData);


function startTimer() {
  let time = timeNode.textContent;
  let arr = time.split(':');
  let min = arr[0];
  let sec = arr[1];
  sec++;
  if (sec < 10) {sec = '0' + sec};
  if (sec === 60) {
    sec = '00';
    min++;
    if (min < 10) {min = '0' + min};
  }
  return min + ':' + sec;
}
setInterval(
  () => timeNode.innerHTML =  startTimer(), 1000
);


//создаем игровое поле
const gameBoard = document.createElement('div');
gameBoard.classList.add('game-board');
body.append(gameBoard);


//создаем фрагмент для фишек
const fragment = document.createDocumentFragment();

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];
//перемешиваем фишки
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

//создаем фишки
function generateChips () {
  shuffleArray(numbers);
  numbers = savedNumbers || numbers;
  numbers.forEach((item, i) => {
    const chip = document.createElement('div');
    chip.classList.add('game-board__chip');
    chip.textContent = item;
    if (item === '') {
      chip.classList.add('game-board__empty-space');  
    }
    fragment.append(chip);
  }); 
  gameBoard.append(fragment);
}

generateChips();

//кнопка размешать и начать
buttonStart.addEventListener('click', (evt) => {
  let chips = document.querySelectorAll('.game-board__chip');
  chips.forEach((item) => {
    gameBoard.removeChild(item);
  })
  generateChips();
  timeNode.textContent = '00:00';

  chips = document.getElementsByClassName('game-board__chip'); 
  for (let i = 0; i < 16; i++) { 
    chips[i].addEventListener('click', (evt) => {
      if (chips[i - 1] && chips[i - 1].classList.contains('game-board__empty-space')) {
        changePlaces(chips[i], chips[i - 1]);
      }
      if (chips[i + 1] && chips[i + 1].classList.contains('game-board__empty-space')) {
        changePlaces(chips[i], chips[i + 1]);
      }
      if (chips[i - 4] && chips[i - 4].classList.contains('game-board__empty-space')) {
        changePlaces(chips[i], chips[i - 4]);
      }
      if (chips[i + 4] && chips[i + 4].classList.contains('game-board__empty-space')) {
        changePlaces(chips[i], chips[i + 4]);
      }
    })
  }
});


//кнопка сохранить
buttonSave.addEventListener('click', (evt) => {
  const chips = document.querySelectorAll('.game-board__chip');
  let savedGame = [];
  chips.forEach((item) => {
    savedGame.push(item.textContent);
  })
  localStorage.setItem('savedGame', savedGame);
});


let chips = document.getElementsByClassName('game-board__chip'); 

function changePlaces (el1, el2) {
  el2.classList.remove('game-board__empty-space');
  //el2.classList.add('change-class');
  el2.textContent = el1.textContent; 
  el1.classList.add('game-board__empty-space');
  el1.textContent = '';
  movesValue++;
  moves.textContent = `Ходов: ${movesValue}`;
};
  
for (let i = 0; i < 16; i++) { 
  chips[i].addEventListener('click', (evt) => {
    if (chips[i - 1] && chips[i - 1].classList.contains('game-board__empty-space')) {
      changePlaces(chips[i], chips[i - 1]);
    }
    if (chips[i + 1] && chips[i + 1].classList.contains('game-board__empty-space')) {
      changePlaces(chips[i], chips[i + 1]);
    }
    if (chips[i - 4] && chips[i - 4].classList.contains('game-board__empty-space')) {
      changePlaces(chips[i], chips[i - 4]);
    }
    if (chips[i + 4] && chips[i + 4].classList.contains('game-board__empty-space')) {
      changePlaces(chips[i], chips[i + 4]);
    }
  })
}
  



  
})


