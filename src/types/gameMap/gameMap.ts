interface Chunk {
    id: number;
    name: string;
    image: HTMLImageElement;
    collision: boolean;
}

interface GameMap {
    id: number;
    name: string;
    width: number;
    height: number;
    chunks: Array<Array<number>>;
}

export { GameMap, Chunk };
