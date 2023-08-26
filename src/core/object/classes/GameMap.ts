import { TILE_SIZE } from 'src/constants';

class GameMap {
    tailSize: number;
    layers: Array<Array<Array<number>>>;
    width: number;
    height: number;
    layersNum: number;

    constructor(layers) {
        this.tailSize = TILE_SIZE;
        this.layers = layers;
        this.layersNum = layers.length;
        this.height = layers[0].length * TILE_SIZE;
        this.width = layers[0][0].length * TILE_SIZE;
    }

    getSerializableObject() {
        return {
            tileSize: this.tailSize,
            layers: this.layers,
            width: this.width,
            height: this.height,
            layersNum: this.layersNum,
        };
    }
}

export { GameMap };
