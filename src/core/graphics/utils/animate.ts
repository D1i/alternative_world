import { PlayerPhysics } from 'src/types/movement';
import { canvasWidth, canvasHeight, playerTexture } from './constants';
import { ObjectTypes } from 'src/types';
import { drawLayers, drawTopLayers } from './draw';

interface PlayerRef {
    current: PlayerPhysics;
}

interface MapRef {
    current: ObjectTypes.GameMapObj;
}

interface RenderStateRef {
    current: boolean;
}

const animate = (
    ctx: CanvasRenderingContext2D,
    playerRef: PlayerRef,
    mapRef: MapRef,
    renderStateRef: RenderStateRef
) => {
    const renderState = renderStateRef.current;
    if (!renderState) return;

    const player = playerRef.current;
    const map = mapRef.current;
    const { layers, tileSize } = map;
    const playerCoords = player.position;

    ctx.clearRect(
        -canvasWidth / 2,
        -canvasHeight / 2,
        canvasWidth * 2,
        canvasHeight * 2
    );
    const topLayers = drawLayers(ctx, layers, tileSize, playerCoords);

    ctx.drawImage(
        playerTexture,
        canvasWidth / 2 - player.size.x / 2,
        canvasHeight / 2 - player.size.y / 2,
        player.size.x,
        player.size.y
    );

    drawTopLayers(ctx, topLayers, tileSize, playerCoords);

    requestAnimationFrame(() =>
        animate(ctx, playerRef, mapRef, renderStateRef)
    );
};

export { animate };
