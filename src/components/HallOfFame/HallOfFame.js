export default class HallOfFame {
  constructor() {
    this._ratingList = [];
    this._init();
  }

  get ratingList() {
    return this._ratingList;
  }

  _init() {
    this._getRatingListFromLocalStorage()
  }

  addMember({ name, score }) {
    this._ratingList.push({ name, score, position: null });
    this._ratingList.sort((prev, next) => next.score - prev.score)
      .forEach((member, index) => member.position = index + 1);

    this._puttRatingListToLocalStorage();
  }

  _getRatingListFromLocalStorage() {
    const ratingListString = localStorage.getItem('ratingList');
    if (!ratingListString) return;
    const ratingList = JSON.parse(ratingListString);
    this._ratingList = [...ratingList]
  }

  _puttRatingListToLocalStorage() {
    const ratingList = JSON.stringify(this._ratingList);
    localStorage.setItem('ratingList', ratingList);
  }
}

