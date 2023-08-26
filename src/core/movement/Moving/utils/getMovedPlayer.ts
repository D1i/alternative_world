import { ObjectTypes } from 'src/types';
import { PlayerPhysics } from 'src/types/movement';
import { verticalCollizion } from './verticalCollizion';
import { horisontalCollizion } from './horisontalCollizion';

interface PlayerRef {
    current: PlayerPhysics;
}

interface MapRef {
    current: ObjectTypes.GameMapObj;
}

const getMovedPlayer = (
    playerRef: PlayerRef,
    mapRef: MapRef
): PlayerPhysics => {
    const player = playerRef.current;
    const { falling } = player;
    let zSpeed: number = player.speed.z;
    let zPosition: number = player.position.z;
    let currentFalling: boolean = true;
    let xPositionPx: number = player.position.x;
    let yPositionPx: number = player.position.y;

    const zHeight = player.size.z;
    const { layers, tileSize, width, height } = mapRef.current;

    if (!falling) {
        xPositionPx = player.position.x + player.speed.x / 100;
        yPositionPx = player.position.y + player.speed.y / 100;
        currentFalling = !verticalCollizion(
            layers,
            tileSize,
            player,
            zPosition / tileSize
        );

        const coords = horisontalCollizion(
            layers,
            tileSize,
            player,
            xPositionPx,
            yPositionPx,
            width,
            height
        );
        xPositionPx = coords.currentXPosition;
        yPositionPx = coords.currentYPosition;
    } else {
        zSpeed -= 0.1;
        zPosition += zSpeed;
        let zCeil =
            Math.ceil(zPosition) + tileSize - (Math.ceil(zPosition) % tileSize);
        if (zPosition < 0) zCeil = 0;

        if (zSpeed <= 0) {
            // console.log(zCeil);
            if (zCeil - zPosition < zHeight / 4) {
                const collizion = verticalCollizion(
                    layers,
                    tileSize,
                    player,
                    zCeil / tileSize
                );

                if (collizion) {
                    currentFalling = false;
                    zSpeed = 0;
                    zPosition = zCeil;
                }
            }
        }

        if (zSpeed > 0) {
            if (zCeil - zPosition <= zHeight) {
                const collizion = verticalCollizion(
                    layers,
                    tileSize,
                    player,
                    zCeil / tileSize
                );
                if (collizion) {
                    zSpeed = 0;
                    const maxZ = zCeil - zHeight - 5;
                    zPosition = zPosition < maxZ ? zPosition : maxZ;
                } else {
                }
            }
        }
    }

    return {
        ...player,
        position: {
            x: xPositionPx,
            y: yPositionPx,
            z: zPosition,
        },
        speed: {
            ...player.speed,
            z: zSpeed,
        },
        falling: currentFalling,
    };
};

export { getMovedPlayer };
