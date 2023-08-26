import { grassImage } from '../images/images';
import { tiles } from './tiles';
import { createTile } from './utils';

const tilesInit = () => {
    createTile(grassImage, true);
    return tiles;
};

export { tilesInit };
