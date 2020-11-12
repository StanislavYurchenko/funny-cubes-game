import './styles.scss';
import 'bootstrap';
import squaresListTemplate from './squareList.hbs'
import squaresItemTemplate from './squareItem.hbs'

const n = 25;
const min = -1;
const max = 10;
let score = 0;

const boxRef = document.querySelector('.box');



const array = Array.from({ length: n }, () => randomInteger(min, max));

function renderSquareList(hbs, Ref) {
  Ref.innerHTML = hbs();
}

function renderSquareItem(hbs, Ref, data) {
  Ref.firstChild.innerHTML = hbs(data);
}


function onSquare(event) {
  const square = event.target;
  const squares = Array.from(event.currentTarget.children);



  const number = Number(square.dataset.number);
  const isActiveSquare = square.dataset.isActiveSquare === 'true';


  if (isActiveSquare) {


    console.log(`You received score ${number}`);
    score += +number;

    const index = squares.indexOf(square);

    squaresData[index] = { number: 0, isActiveSquare: false }


    let numberOfNewSquares = randomInteger(0, 2);

    while (numberOfNewSquares > 0) {

      const randomSquare = randomInteger(0, n - 1);

      if (squares[randomSquare].dataset.isActiveSquare === "true") continue;

      const randomInt = randomInteger(-1, 2)
      if (randomInt === 0) continue;

      const isActive = randomInt >= -1 && randomInt <= 2 && randomInt !== 0;

      squaresData[randomSquare] = {
        number: isActive ? randomInt : 0,
        isActiveSquare: isActive
      }

      numberOfNewSquares -= 1;

    }

    renderSquareItem(squaresItemTemplate, boxRef, squaresData);
    console.log('score', score);
    const gameOver = squaresData.every(square => square.isActiveSquare) || squaresData.every(square => !square.isActiveSquare)
    if (gameOver) {

      console.log('Game over, your score is ', score);
      return
    }
  }
}


function creatSquares(array) {
  return array.map(el => {
    const isActive = el >= -1 && el <= 2 && el !== 0;
    return {
      number: isActive ? el : 0,
      isActiveSquare: isActive,
    }
  })
}

function randomInteger(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

let squaresData = creatSquares(array);

renderSquareList(squaresListTemplate, boxRef);
renderSquareItem(squaresItemTemplate, boxRef, squaresData);

const squaresRef = boxRef.querySelector('.squares');

squaresRef.addEventListener('click', onSquare)





