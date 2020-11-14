import itemOfHallOfFame from './itemOfHallOfFame.hbs';
import lastResultItemOfHallOfFame from './lastResultItemOfHallOfFame.hbs';

export default function RenderHallOfFame(rootSelector, membersList, lastGameData) {
  const quantityBestMembers = 5;

  if (!membersList.length) return;
  const rootRef = document.querySelector(rootSelector);
  const bestMembers = membersList.slice(0, quantityBestMembers);

  rootRef.innerHTML = itemOfHallOfFame(bestMembers);

  if (lastGameData) {
    const lastGameResult = membersList.find(
      member => member.name === lastGameData.name && member.score === lastGameData.score,
    );
    rootRef.insertAdjacentHTML('beforeend', lastResultItemOfHallOfFame(lastGameResult));
  }
}
