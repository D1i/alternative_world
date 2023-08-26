class Tile {
    texture: HTMLImageElement;
    collizion: boolean;

    constructor(texture: HTMLImageElement, collizion) {
        this.texture = texture;
        this.collizion = collizion;
    }

    getSerializableObject() {
        return {
            texture: this.texture,
            collizion: this.collizion,
        };
    }
}

export { Tile };
