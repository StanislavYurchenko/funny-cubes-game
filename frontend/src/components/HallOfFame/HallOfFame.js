export default class HallOfFame {
  constructor() {
    this._ratingList = [];
    this._currentUser = { login: 'Anonymous', name: 'Anonymous', role: 'gamer' };
  }

  get ratingList() {
    return this._ratingList;
  }

  get currentUser() {
    return this._currentUser;
  }

  init(callback) {
    this.getResults(callback);
  }

  getResults(callback) {
    fetch('http://localhost:9090/results')
      .then(res => res.json())
      .then(({ bestTenResults, user }) => {
        const results = bestTenResults.map((result, index) => ({
          ...result,
          position: index + 1,
        }));
        console.log(results, user);
        return { results, user };
      })
      .then(({ results, user }) => {
        this._currentUser = user;
        this._ratingList = [...results];
        callback();
      })
      .catch(error => console.log(error));
  }

  addMember(member, callback) {
    const initPost = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    };
    fetch('http://localhost:9090/results', initPost)
      .then(res => res.json())
      .then(res => {
        callback();
      })
      .catch(error => console.log(error));
  }
}
