import { tiles } from '../tiles';
import { Tile } from 'src/core/object/classes';

const createTile = (texture: HTMLImageElement, collizion: boolean) => {
    const tile = new Tile(texture, collizion);
    tiles.push(tile.getSerializableObject());
};

export { createTile };
