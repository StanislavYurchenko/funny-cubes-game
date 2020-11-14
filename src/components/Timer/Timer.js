export default class CountdownTimer {
  constructor(setPointTime, rootSelector, callBackTimeOver) {
    this._root = document.querySelector(rootSelector);
    this._setPointTime = setPointTime;
    this._startTime = null;
    this._startPauseTime = null;
    this._stopPauseTime = null;
    this._totalPauseTime = 0;
    this._callBackTimeOver = callBackTimeOver;
    this._timeLeft = 0;
    this._intervalId = null;
    this._init();
  }

  _init() {
    this._render(this._convertTime(this._setPointTime));
    clearTimeout(this._intervalId);
    this._stopPauseTime = Date.now();
    this._startPauseTime = this._stopPauseTime;
  }

  _tick() {
    this._intervalId = setTimeout(() => {
      this._tick();
      this._timeLeft = this._setPointTime - Date.now() + this._startTime + this._totalPauseTime;
      this._render(this._convertTime(this._timeLeft));
      if (this._timeLeft <= 0) {
        this.stop();
      }
    }, 1000);
  }

  reset() {
    this._init();
  }

  _render(time) {
    this._root.textContent = time;
  }

  _convertTime(time) {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      .toString()
      .padStart(2, '0');
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, '0');
    const secs = Math.round((time % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0');
    return `${hours}:${mins}:${secs}`
  }

  start() {
    this._init();
    this._startTime = Date.now();
    this._tick();
  }

  pause() {
    this._startPauseTime = Date.now();
    clearTimeout(this._intervalId);
  }

  resume() {
    this._stopPauseTime = Date.now();
    this._totalPauseTime += this._stopPauseTime - this._startPauseTime;
    this._tick();
  }

  stop() {
    this._init();
    this._callBackTimeOver && this._callBackTimeOver();
  }
}