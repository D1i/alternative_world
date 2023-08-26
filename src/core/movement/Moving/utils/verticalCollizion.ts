import { tiles } from 'src/core/object';
import { PlayerPhysics } from 'src/types/movement';

const verticalCollizion = (
    layers: Array<Array<Array<number>>>,
    tileSize: number,
    player: PlayerPhysics,
    currentZ: number
) => {
    let collizion = false;
    const playerWidth = player.size.x;
    const playerHeight = player.size.y;
    const playerX = player.position.x;
    const playerY = player.position.y;
    if (layers[currentZ]) {
        const collizionTiles = [];
        layers[currentZ].forEach((row, y) =>
            row.forEach((tileNum, x) => {
                if (tiles[tileNum]?.collizion) {
                    if (
                        x * tileSize >=
                            playerX - playerWidth / 2 - tileSize / 2 &&
                        x * tileSize <= playerX + playerWidth / 2 + tileSize / 2
                    ) {
                        if (
                            y * tileSize >=
                                playerY - playerHeight / 2 - tileSize / 2 &&
                            y * tileSize <=
                                playerY + playerHeight / 2 + tileSize / 2
                        ) {
                            collizionTiles.push(tileNum);
                        }
                    }
                }
            })
        );
        if (collizionTiles.length) {
            collizion = true;
        }
    }
    return collizion;
};

export { verticalCollizion };
