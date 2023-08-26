import { canvasWidth, canvasHeight } from './constants';
import { tiles } from 'src/core/object';
import { initZIndex, visibleZDiff, opacityZDiff } from './constants';

interface PlayerCoords {
    x: number;
    y: number;
    z: number;
}

interface TopTile {
    x: number;
    y: number;
    z: number;
    texture: HTMLImageElement;
}

const drawLayers = (
    ctx: CanvasRenderingContext2D,
    layers: Array<Array<Array<number>>>,
    tileSize: number,
    playerCoords: PlayerCoords
) => {
    const topLayers: Array<TopTile> = [];

    layers.forEach((layer, z) =>
        layer.forEach((row, y) =>
            row.forEach((tileNum, x) => {
                if (!tiles[tileNum]) return;

                const texture = tiles[tileNum].texture;
                let zI = initZIndex;

                if (z * tileSize - playerCoords.z > visibleZDiff * tileSize) {
                    return;
                } else if (z * tileSize > playerCoords.z) {
                    topLayers.push({
                        x,
                        y,
                        z,
                        texture,
                    });
                    return;
                } else if (z * tileSize < playerCoords.z) {
                    zI += (playerCoords.z - z * tileSize) / tileSize;
                }

                const layerXPosition =
                    canvasWidth / 2 +
                    (-playerCoords.x + x * tileSize - tileSize / 2) /
                        (zI / initZIndex);

                const layerYPosition =
                    canvasHeight / 2 +
                    (playerCoords.y - y * tileSize - tileSize / 2) /
                        (zI / initZIndex);

                const layerSize = tileSize / (zI / initZIndex);
                ctx.drawImage(
                    texture,
                    layerXPosition,
                    layerYPosition,
                    layerSize,
                    layerSize
                );
                ctx.globalAlpha = 0.5;
                ctx.strokeRect(
                    layerXPosition,
                    layerYPosition,
                    layerSize,
                    layerSize
                );
                ctx.globalAlpha = 1;
            })
        )
    );

    return topLayers;
};

const drawTopLayers = (
    ctx: CanvasRenderingContext2D,
    topLayers: Array<TopTile>,
    tileSize: number,
    playerCoords: PlayerCoords
) => {
    topLayers.forEach((layer) => {
        const { texture, x, y, z } = layer;
        let zI = initZIndex;
        let alphaIndex = 1;
        zI += (playerCoords.z - z * tileSize) / tileSize;

        if (zI < initZIndex - opacityZDiff) {
            alphaIndex =
                1 /
                ((initZIndex - opacityZDiff - (initZIndex - visibleZDiff)) /
                    (zI - (initZIndex - visibleZDiff)));
            ctx.globalAlpha = alphaIndex;
        }

        const layerXPosition =
            canvasWidth / 2 +
            (-playerCoords.x + x * tileSize - tileSize / 2) / (zI / initZIndex);

        const layerYPosition =
            canvasHeight / 2 +
            (playerCoords.y - y * tileSize - tileSize / 2) / (zI / initZIndex);

        const layerSize = tileSize / (zI / initZIndex);

        ctx.drawImage(
            texture,
            layerXPosition,
            layerYPosition,
            layerSize,
            layerSize
        );
        ctx.globalAlpha = alphaIndex / 2;
        ctx.strokeRect(layerXPosition, layerYPosition, layerSize, layerSize);
        ctx.globalAlpha = 1;
    });
};

export { drawLayers, drawTopLayers };
