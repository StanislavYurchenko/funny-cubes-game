import squaresListTemplate from './squareList.hbs';
import squaresItemTemplate from './squareItem.hbs';

export default class FunnyCubes {
  constructor(rootSelector, scopeSelector, callBackTimerReset) {
    this._callBackTimerReset = callBackTimerReset;
    this._quantitySquare = 144;
    this._minSquareValue = -1;
    this._maxSquareValue = 10;
    this._score = 0;
    this._rootRef = document.querySelector(rootSelector);
    this._scoreRef = document.querySelectorAll(scopeSelector);
    this._squaresRef = null;
    this._squaresData = [];
    this._isGameOver = null;
    this.init();
  }

  init() {
    const init = true;
    this._squaresData = this._creatSquares(init);
    this._renderSquareList();
    this._renderSquareItem(this._squaresData);
    this._squaresRef = this._rootRef.firstChild;
    this._squaresRef.addEventListener('click', this._onSquare.bind(this));
  }

  startNewGame() {
    this._isGameOver = false;
    this._squaresData = this._creatSquares();
    this._renderSquareItem(this._squaresData);
  }

  initGameOver(callback) {
    this._isGameOver = true;
    console.log('Game over, your score is ', this._score);
    callback && callback();
  }

  _randomInteger(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  }

  _creatSquares(init = false) {
    const array = Array.from({ length: this._quantitySquare }, () =>
      init ? 0 : this._randomInteger(-1, 10),
    );
    return array.map(el => {
      const isActive = el >= -1 && el <= 2 && el !== 0;
      return {
        number: isActive ? el : 0,
        isActiveSquare: isActive,
      };
    });
  }

  _renderSquareList() {
    this._rootRef.innerHTML = squaresListTemplate();
  }

  _renderSquareItem(data) {
    this._rootRef.firstChild.innerHTML = squaresItemTemplate(data);
  }

  _renderScope() {
    this._scoreRef.forEach(elem => elem.textContent = `${this._score}`.padStart(4, '0'))
  }

  _onSquare(event) {
    const square = event.target;
    const squares = Array.from(event.currentTarget.children);
    const number = Number(square.dataset.number);
    const isActiveSquare = square.dataset.isActiveSquare === 'true';

    if (isActiveSquare) {
      this._score += +number;
      this._renderScope();

      const index = squares.indexOf(square);

      this._squaresData[index] = { number: 0, isActiveSquare: false };

      let numberOfNewSquares = this._randomInteger(0, 2);

      while (numberOfNewSquares > 0) {
        const randomSquare = this._randomInteger(0, this._quantitySquare - 1);
        if (squares[randomSquare].dataset.isActiveSquare === 'true') continue;

        const randomSquareValue = this._randomInteger(-1, 2);
        if (randomSquareValue === 0) continue;

        this._squaresData[randomSquare] = { number: randomSquareValue, isActiveSquare: true };

        numberOfNewSquares -= 1;
      }

      this._renderSquareItem(this._squaresData);

      this._isGameOver = this._squaresData.every(square => !square.isActiveSquare);

      if (this._isGameOver) {
        this._callBackTimerReset()
        this.initGameOver();
        return;
      }
    }
  }
}
