import './styles.scss';
import 'bootstrap';
import $ from 'jquery';
import FunnyCubes from './components/FunnyCubes/FunnyCubes';
import Timer from './components/Timer/Timer';
import HallOfFame from './components/HallOfFame/HallOfFame';
import RenderHallOfFame from './components/RenderHallOfFame/RenderHallOfFame';

const gameDuration = 60000 //ms

const btnStartGameRef = document.querySelector('.js-start');
const btnNewGameRef = document.querySelector('.js-new-game');
const formAddToHallOfFameRef = document.querySelector('.js-add-result');
const pauseLayerRef = document.querySelector('.js-pause');

const funnyCubes = new FunnyCubes('.js-box', '.js-scope', timeOver);
const gameTimer = new Timer(gameDuration, '.js-timer', gameOver);
const hallOfFame = new HallOfFame();

function toggleButtonStatus(event) {
  const buttonRef = event.currentTarget;
  const buttonStatus = buttonRef.dataset.status;

  if (buttonStatus === 'start' || buttonStatus === 'resume') {
    buttonRef.innerHTML = 'Pause';
    buttonRef.dataset.status = 'pause';
  }

  if (buttonStatus === 'pause') {
    buttonRef.innerHTML = 'Resume';
    buttonRef.dataset.status = 'resume';
  }
}

function setToStartButtonStatus(buttonRef) {
  buttonRef.innerHTML = 'Start';
  buttonRef.dataset.status = 'start';
}

function setToPauseButtonStatus(buttonRef) {
  buttonRef.innerHTML = 'Pause';
  buttonRef.dataset.status = 'pause';
}



function onBtnStartGame(event) {
  const buttonRef = event.currentTarget;
  const buttonStatus = buttonRef.dataset.status;

  if (buttonStatus === 'start') {
    funnyCubes.startNewGame();
    gameTimer.start();
  }

  if (buttonStatus === 'pause') {
    gameTimer.pause();
    funnyCubes.pause();
    pauseLayerRef.classList.remove('invisible');
  }

  if (buttonStatus === 'resume') {
    gameTimer.resume();
    funnyCubes.resume();
    pauseLayerRef.classList.add('invisible');
  }

  toggleButtonStatus(event);
}

function onBtnNewGame() {

  if (btnStartGameRef.dataset.status === 'resume') {
    gameTimer.resume();
    funnyCubes.resume();
    pauseLayerRef.classList.add('invisible');
  }

  funnyCubes.startNewGame();
  gameTimer.start();
  setToPauseButtonStatus(btnStartGameRef);
}

function gameOver() {
  funnyCubes.initGameOver();
  setToStartButtonStatus(btnStartGameRef);
  $('.js-result-modal').modal('show');
}

function timeOver() {
  gameTimer.reset();
  setToStartButtonStatus(btnStartGameRef);
  $('.js-result-modal').modal('show');
}

function onFormAddToHallOfFame(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const result = {
    name: form.elements.name.value,
    score: funnyCubes.score,
  };
  hallOfFame.addMember(result);
  RenderHallOfFame('.js-hall-of-fame', hallOfFame.ratingList, result);

  form.reset();
  $('.js-result-modal').modal('hide');
}

btnStartGameRef.addEventListener('click', onBtnStartGame);
btnNewGameRef.addEventListener('click', onBtnNewGame);
formAddToHallOfFameRef.addEventListener('submit', onFormAddToHallOfFame);

funnyCubes.init();
gameTimer.init();
hallOfFame.init();

RenderHallOfFame('.js-hall-of-fame', hallOfFame.ratingList);
