import squaresListTemplate from './squareList.hbs'
import squaresItemTemplate from './squareItem.hbs'



export default class FunnyCubes {
  constructor(root) {
    this.n = 144;
    this.min = -1;
    this.max = 10;
    this.score = 0;
    this.boxRef = root;
    this.squaresRef = null;
    this.array = [];
    this.squaresData = [];
    this.isGameOver = null;

    this.init();
  }

  init() {
    const init = true;
    this.squaresData = this.creatSquares(init);
    this.renderSquareList();
    this.renderSquareItem(this.squaresData);
  }

  startNewGame() {
    this.isGameOver = false;
    this.squaresData = this.creatSquares();
    this.renderSquareItem(this.squaresData);
    this.squaresRef = this.boxRef.firstChild;
    this.squaresRef.addEventListener('click', this.onSquare.bind(this));
  }

  initGameOver(callback) {
    this.isGameOver = true;
    callback();
    console.log('Game over, your score is ', this.score);
  }

  randomInteger(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  }

  creatSquares(init = false) {
    const array = Array.from({ length: this.n }, () => init ? 0 : this.randomInteger(this.min, this.max));
    return array.map(el => {
      const isActive = el >= -1 && el <= 2 && el !== 0;
      return {
        number: isActive ? el : 0,
        isActiveSquare: isActive,
      }
    })
  }

  renderSquareList() {
    this.boxRef.innerHTML = squaresListTemplate();
  }

  renderSquareItem(data) {
    this.boxRef.firstChild.innerHTML = squaresItemTemplate(data);
  }

  onSquare(event) {
    const square = event.target;
    const squares = Array.from(event.currentTarget.children);

    const number = Number(square.dataset.number);
    const isActiveSquare = square.dataset.isActiveSquare === 'true';

    if (isActiveSquare) {
      console.log(`You received score ${number}`);
      this.score += +number;
      console.log(`Your score is ${this.score}`);

      const index = squares.indexOf(square);

      this.squaresData[index] = { number: 0, isActiveSquare: false }

      let numberOfNewSquares = this.randomInteger(0, 2);

      while (numberOfNewSquares > 0) {

        const randomSquare = this.randomInteger(0, this.n - 1);

        if (squares[randomSquare].dataset.isActiveSquare === "true") continue;

        const randomInt = this.randomInteger(-1, 2)
        if (randomInt === 0) continue;

        const isActive = randomInt >= -1 && randomInt <= 2 && randomInt !== 0;

        this.squaresData[randomSquare] = {
          number: isActive ? randomInt : 0,
          isActiveSquare: isActive
        }

        numberOfNewSquares -= 1;
      }

      this.renderSquareItem(this.squaresData);

      this.isGameOver = this.squaresData.every(square => square.isActiveSquare) || this.squaresData.every(square => !square.isActiveSquare)
      if (this.isGameOver) {
        this.initGameOver();
        return
      }
    }
  }

}

