import { GameMap } from '../classes';
import { layers } from './layers';
import { layersInit } from './layersInit';

layersInit();

const gameMap = new GameMap(layers);

export { gameMap };
