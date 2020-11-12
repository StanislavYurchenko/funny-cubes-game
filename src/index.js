import './styles.scss';
import 'bootstrap';
import FunnyCubes from './components/FunnyCubes/FunnyCubes'

const boxRef = document.querySelector('.box');

const funnyCubes = new FunnyCubes(boxRef);
funnyCubes.startNewGame();







