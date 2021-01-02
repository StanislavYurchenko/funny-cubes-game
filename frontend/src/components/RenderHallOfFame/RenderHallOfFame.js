import itemOfHallOfFame from './itemOfHallOfFame.hbs';
import lastResultItemOfHallOfFame from './lastResultItemOfHallOfFame.hbs';

export default function RenderHallOfFame(rootSelector, membersList, lastGameData) {
  if (!membersList.length) return;
  
  const rootRef = document.querySelector(rootSelector);

  rootRef.innerHTML = itemOfHallOfFame(membersList);

  if (lastGameData) {
    rootRef.insertAdjacentHTML('beforeend', lastResultItemOfHallOfFame(lastGameData));
  }
}
