import { GameMapTypes } from 'src/types';

import grassAsset from './assets/grass.jpg';
import stoneAsset from './assets/stone.jpg';

const grassImage = new Image();
grassImage.src = grassAsset;
const stoneImage = new Image();
stoneImage.src = stoneAsset;

const grassChunk: GameMapTypes.Chunk = {
    id: 0,
    name: 'grass',
    image: grassImage,
    collision: false,
};

const stoneChunk: GameMapTypes.Chunk = {
    id: 1,
    name: 'stone',
    image: stoneImage,
    collision: true,
};

const chunkAssets = [grassChunk, stoneChunk];

export { chunkAssets };
