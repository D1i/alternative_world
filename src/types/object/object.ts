// export type Tails = Array<Tail | null>;
// export type Layer = Array<Array<number>>;

export interface Tile {
    texture: HTMLImageElement;
    collizion: boolean;
}

export interface GameMapObj {
    tileSize: number;
    width: number;
    height: number;
    layersNum: number;
    layers: Array<Array<Array<number>>>;
}

// export type Tails = {
//     Tails: Array<Tail | null>;
// };

// export type Layer = {
//     Layer: Array<Array<number>>;
// };
