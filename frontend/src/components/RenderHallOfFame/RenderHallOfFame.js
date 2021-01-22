import itemOfHallOfFame from './itemOfHallOfFame.hbs';
import lastResultItemOfHallOfFame from './lastResultItemOfHallOfFame.hbs';

export default function RenderHallOfFame(rootSelector, hallOfFame, lastGameData) {
  const { ratingList, currentUser } = hallOfFame;
  console.log('currentUser', currentUser);
  console.log('ratingList', ratingList);
  const rootRef = document.querySelector(rootSelector);
  rootRef.innerHTML = itemOfHallOfFame({ ratingList, currentUser });

  if (lastGameData) {
    const ref = rootRef.querySelector('.tbody');
    ref.insertAdjacentHTML('beforeend', lastResultItemOfHallOfFame(lastGameData));
  }
}
