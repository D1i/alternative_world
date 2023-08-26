import { tiles } from 'src/core/object';
import { PlayerPhysics } from 'src/types/movement';

const horisontalCollizion = (
    layers: Array<Array<Array<number>>>,
    tileSize: number,
    player: PlayerPhysics,
    xPositionPx: number,
    yPositionPx: number,
    mapWidth: number,
    mapHeight: number
) => {
    let currentXPosition = xPositionPx;
    let currentYPosition = yPositionPx;

    const playerWidth = player.size.x;
    const playerHeight = player.size.y;
    const playerTail = player.size.z;
    const playerX = player.position.x;
    const playerY = player.position.y;
    const playerZ = player.position.z;
    const playerXSpeed = player.speed.x;
    const playerYSpeed = player.speed.y;

    layers.forEach((layer, z) => {
        if (z * tileSize > playerZ && z * tileSize - playerZ < playerTail) {
            layer.forEach((row, y) =>
                row.forEach((tileNum, x) => {
                    if (tiles[tileNum]?.collizion) {
                        if (
                            playerX >
                                x * tileSize - playerWidth / 2 - tileSize / 2 &&
                            playerX <
                                x * tileSize + playerWidth / 2 + tileSize / 2 &&
                            playerY >
                                y * tileSize -
                                    playerHeight / 2 -
                                    tileSize / 2 &&
                            playerY <
                                y * tileSize + playerHeight / 2 + tileSize / 2
                        ) {
                            const xIndex = x * tileSize - playerX;
                            const yIndex = y * tileSize - playerY;

                            if (Math.abs(xIndex) > Math.abs(yIndex)) {
                                if (xIndex > 0) {
                                    currentXPosition =
                                        x * tileSize -
                                        playerWidth / 2 -
                                        tileSize / 2;
                                } else {
                                    currentXPosition =
                                        x * tileSize +
                                        playerWidth / 2 +
                                        tileSize / 2;
                                }
                            } else {
                                if (yIndex > 0) {
                                    currentYPosition =
                                        y * tileSize -
                                        playerHeight / 2 -
                                        tileSize / 2;
                                } else {
                                    currentYPosition =
                                        y * tileSize +
                                        playerHeight / 2 +
                                        tileSize / 2;
                                }
                            }
                        } else {
                            if (
                                playerY >
                                    y * tileSize -
                                        playerHeight / 2 -
                                        tileSize / 2 &&
                                playerY <
                                    y * tileSize +
                                        playerHeight / 2 +
                                        tileSize / 2
                            ) {
                                if (
                                    playerX ===
                                        x * tileSize -
                                            playerWidth / 2 -
                                            tileSize / 2 &&
                                    playerXSpeed > 0
                                ) {
                                    currentXPosition =
                                        x * tileSize -
                                        playerWidth / 2 -
                                        tileSize / 2;
                                } else if (
                                    playerX ===
                                        x * tileSize +
                                            playerWidth / 2 +
                                            tileSize / 2 &&
                                    playerXSpeed < 0
                                ) {
                                    currentXPosition =
                                        x * tileSize +
                                        playerWidth / 2 +
                                        tileSize / 2;
                                }
                            }

                            if (
                                playerX >
                                    x * tileSize -
                                        playerWidth / 2 -
                                        tileSize / 2 &&
                                playerX <
                                    x * tileSize +
                                        playerWidth / 2 +
                                        tileSize / 2
                            ) {
                                if (
                                    playerY ===
                                        y * tileSize -
                                            playerHeight / 2 -
                                            tileSize / 2 &&
                                    playerYSpeed > 0
                                ) {
                                    currentYPosition =
                                        y * tileSize -
                                        playerHeight / 2 -
                                        tileSize / 2;
                                } else if (
                                    playerY ===
                                        y * tileSize +
                                            playerHeight / 2 +
                                            tileSize / 2 &&
                                    playerYSpeed < 0
                                ) {
                                    currentYPosition =
                                        y * tileSize +
                                        playerHeight / 2 +
                                        tileSize / 2;
                                }
                            }
                        }
                    }
                })
            );
        }
        if (playerZ === z * tileSize) {
            // layer.forEach((row, y) =>
            //     row.forEach((tileNum, x) => {
            //         if (!tiles[tileNum]?.collizion) {
            //             if (
            //                 playerX >
            //                     x * tileSize - playerWidth / 2 - tileSize / 2 &&
            //                 playerX <
            //                     x * tileSize + playerWidth / 2 + tileSize / 2 &&
            //                 playerY >
            //                     y * tileSize -
            //                         playerHeight / 2 -
            //                         tileSize / 2 &&
            //                 playerY <
            //                     y * tileSize + playerHeight / 2 + tileSize / 2
            //             ) {
            //                 const xIndex = x * tileSize - playerX;
            //                 const yIndex = y * tileSize - playerY;
            //                 if (Math.abs(xIndex) > Math.abs(yIndex)) {
            //                     if (xIndex > 0) {
            //                         currentXPosition =
            //                             x * tileSize -
            //                             playerWidth / 2 -
            //                             tileSize / 2;
            //                     } else {
            //                         currentXPosition =
            //                             x * tileSize +
            //                             playerWidth / 2 +
            //                             tileSize / 2;
            //                     }
            //                 } else {
            //                     if (yIndex > 0) {
            //                         currentYPosition =
            //                             y * tileSize -
            //                             playerHeight / 2 -
            //                             tileSize / 2;
            //                     } else {
            //                         currentYPosition =
            //                             y * tileSize +
            //                             playerHeight / 2 +
            //                             tileSize / 2;
            //                     }
            //                 }
            //             } else {
            //                 if (
            //                     playerY >
            //                         y * tileSize -
            //                             playerHeight / 2 -
            //                             tileSize / 2 &&
            //                     playerY <
            //                         y * tileSize +
            //                             playerHeight / 2 +
            //                             tileSize / 2
            //                 ) {
            //                     if (
            //                         playerX ===
            //                             x * tileSize -
            //                                 playerWidth / 2 -
            //                                 tileSize / 2 &&
            //                         playerXSpeed > 0
            //                     ) {
            //                         currentXPosition =
            //                             x * tileSize -
            //                             playerWidth / 2 -
            //                             tileSize / 2;
            //                     } else if (
            //                         playerX ===
            //                             x * tileSize +
            //                                 playerWidth / 2 +
            //                                 tileSize / 2 &&
            //                         playerXSpeed < 0
            //                     ) {
            //                         currentXPosition =
            //                             x * tileSize +
            //                             playerWidth / 2 +
            //                             tileSize / 2;
            //                     }
            //                 }
            //                 if (
            //                     playerX >
            //                         x * tileSize -
            //                             playerWidth / 2 -
            //                             tileSize / 2 &&
            //                     playerX <
            //                         x * tileSize +
            //                             playerWidth / 2 +
            //                             tileSize / 2
            //                 ) {
            //                     if (
            //                         playerY ===
            //                             y * tileSize -
            //                                 playerHeight / 2 -
            //                                 tileSize / 2 &&
            //                         playerYSpeed > 0
            //                     ) {
            //                         currentYPosition =
            //                             y * tileSize -
            //                             playerHeight / 2 -
            //                             tileSize / 2;
            //                     } else if (
            //                         playerY ===
            //                             y * tileSize +
            //                                 playerHeight / 2 +
            //                                 tileSize / 2 &&
            //                         playerYSpeed < 0
            //                     ) {
            //                         currentYPosition =
            //                             y * tileSize +
            //                             playerHeight / 2 +
            //                             tileSize / 2;
            //                     }
            //                 }
            //             }
            //         }
            //     })
            // );
        }
    });

    if (currentXPosition < -tileSize / 2 + playerWidth / 2) {
        currentXPosition = -tileSize / 2 + playerWidth / 2;
    } else if (
        currentXPosition === -tileSize / 2 + playerWidth / 2 &&
        playerXSpeed < 0
    ) {
        currentXPosition = -tileSize / 2 + playerWidth / 2;
    } else if (currentXPosition > mapWidth - tileSize / 2 - playerWidth / 2) {
        currentXPosition = mapWidth - tileSize / 2 - playerWidth / 2;
    } else if (
        currentXPosition === mapWidth - tileSize / 2 - playerWidth / 2 &&
        playerXSpeed > 0
    ) {
        currentXPosition = mapWidth - tileSize / 2 - playerWidth / 2;
    }

    if (currentYPosition < -tileSize / 2 + playerHeight / 2) {
        currentYPosition = -tileSize / 2 + playerHeight / 2;
    } else if (
        currentYPosition === -tileSize / 2 + playerHeight / 2 &&
        playerYSpeed < 0
    ) {
        currentYPosition = -tileSize / 2 + playerHeight / 2;
    } else if (currentYPosition > mapHeight - tileSize / 2 - playerHeight / 2) {
        currentYPosition = mapHeight - tileSize / 2 - playerHeight / 2;
    } else if (
        currentYPosition === mapHeight - tileSize / 2 - playerHeight / 2 &&
        playerYSpeed > 0
    ) {
        currentYPosition = mapHeight - tileSize / 2 - playerHeight / 2;
    }

    return { currentXPosition, currentYPosition };
};

export { horisontalCollizion };
