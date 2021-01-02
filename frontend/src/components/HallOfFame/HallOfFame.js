export default class HallOfFame {
  constructor() {
    this._ratingList = [];
  }

  get ratingList() {
    return this._ratingList;
  }

  init(callback) {
    fetch('http://localhost:3000/results')
      .then(res => res.json())
      .then(res => {
       this.ratingList.push(...res);
       callback();
      })
      .catch(error => console.log(error))
  }

  addMember(member, callback) {
    const initPost = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(member)
    }
    
    fetch('http://localhost:3000/results', initPost)
      .then(res => res.json())
      .then(res => {
        this.ratingList.splice(0, this.ratingList.length, ...res);
        callback();
      })
      .catch(error => console.log(error))
  }
}
