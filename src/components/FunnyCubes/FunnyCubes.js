import squaresListTemplate from './squareList.hbs';
import squaresItemTemplate from './squareItem.hbs';

export default class FunnyCubes {
  constructor(rootSelector, scopeSelector, callBackTimerReset) {
    this._callBackTimerReset = callBackTimerReset;
    this._quantitySquare = 144;
    this._minSquareValue = -1;
    this._maxSquareValue = 10;
    this._minActiveSquareValue = -1;
    this._maxActiveSquareValue = 2;
    this._score = 0;
    this._rootRef = document.querySelector(rootSelector);
    this._scoreRef = document.querySelectorAll(scopeSelector);
    this._squaresRef = null;
    this._squaresData = [];
    this._isGameOver = null;
    this._isPause = false;
  }

  get score() {
    return this._score;
  }

  init() {
    const init = true;
    this._renderSquareList();
    this._squaresData = this._creatSquares(init);
    this._renderSquareItem(this._squaresData);
    this._squaresRef = this._rootRef.firstChild;
    this._squaresRef.addEventListener('click', this._onSquare.bind(this));
  }

  startNewGame() {
    this._score = 0;
    this._renderScope();
    this._isGameOver = false;
    this._squaresData = this._creatSquares();
    this._renderSquareItem(this._squaresData);
  }

  initGameOver() {
    const init = true;
    this._isGameOver = true;
    this._squaresData = this._creatSquares(init);
    this._renderSquareItem(this._squaresData);
  }

  pause() {
    this._isPause = true;
  }

  resume() {
    this._isPause = false;
  }

  _randomInteger(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  }

  _creatSquares(init = false) {
    const array = Array.from({ length: this._quantitySquare }, () =>
      init ? 0 : this._randomInteger(this._minSquareValue, this._maxSquareValue),
    );
    return array.map(el => {
      const isActive =
        el >= this._minActiveSquareValue && el <= this._maxActiveSquareValue && el !== 0;
      return {
        number: isActive ? el : 0,
        isActiveSquare: isActive,
      };
    });
  }

  _renderSquareList() {
    this._rootRef.insertAdjacentHTML('afterbegin', squaresListTemplate());
  }

  _renderSquareItem(data) {
    this._rootRef.firstChild.innerHTML = squaresItemTemplate(data);
  }

  _renderScope() {
    this._scoreRef.forEach(elem => (elem.textContent = this._score));
  }

  _onSquare(event) {
    if (this._isGameOver || this._isPause) return;
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

        const randomSquareValue = this._randomInteger(
          this._minActiveSquareValue,
          this._maxActiveSquareValue,
        );
        if (randomSquareValue === 0) continue;

        this._squaresData[randomSquare] = { number: randomSquareValue, isActiveSquare: true };

        numberOfNewSquares -= 1;
      }

      this._renderSquareItem(this._squaresData);

      this._isGameOver = this._squaresData.every(square => !square.isActiveSquare);

      if (this._isGameOver) {
        this._callBackTimerReset();
        this.initGameOver();
        return;
      }
    }
  }
}
