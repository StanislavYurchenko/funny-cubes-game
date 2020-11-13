import './styles.scss';
import 'bootstrap';
import $ from 'jquery';
import FunnyCubes from './components/FunnyCubes/FunnyCubes'
import Timer from './components/Timer/Timer'

const btnStartGameRef = document.querySelector('.js-start');
const btnNewGameRef = document.querySelector('.js-new-game');

function toggleButtonStatus(event) {
  const buttonRef = event.currentTarget
  const buttonStatus = buttonRef.dataset.status;

  if (buttonStatus === 'start' || buttonStatus === 'resume') {
    buttonRef.innerHTML = 'Pause';
    buttonRef.dataset.status = 'pause'
  }

  if (buttonStatus === 'pause') {
    buttonRef.innerHTML = 'Resume';
    buttonRef.dataset.status = 'resume'
  }
}

function setToStartButtonStatus(buttonRef) {
  buttonRef.innerHTML = 'Start';
  buttonRef.dataset.status = 'start'
}

function onBtnStartGame(event) {
  const buttonRef = event.currentTarget
  const buttonStatus = buttonRef.dataset.status;

  if (buttonStatus === 'start') {
    funnyCubes.startNewGame();
    gameTimer.start();
  }

  if (buttonStatus === 'pause') {
    gameTimer.pause()
  }

  if (buttonStatus === 'resume') {
    gameTimer.resume()
  }

  toggleButtonStatus(event);

}

function onBtnNewGame() {
  funnyCubes.startNewGame();
  gameTimer.start();
  setToStartButtonStatus(btnStartGameRef);
}

function gameOver() {
  console.log('stop game over');
  funnyCubes.initGameOver();
  setToStartButtonStatus(btnStartGameRef);
  $('.js-result-modal').modal('show');
}

function timeOver() {
  console.log('stop timeOver');
  gameTimer.reset();
  setToStartButtonStatus(btnStartGameRef);
  $('.js-result-modal').modal('show');
}

const funnyCubes = new FunnyCubes('.js-box', '.js-scope', timeOver);
const gameTimer = new Timer(40000, '.js-timer', gameOver);

btnStartGameRef.addEventListener('click', onBtnStartGame)
btnNewGameRef.addEventListener('click', onBtnNewGame)







