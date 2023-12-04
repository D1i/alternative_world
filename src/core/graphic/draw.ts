import { GameMapTypes, PhysicPlayerTypes } from 'src/types';
import { chunkAssets } from '../object/chunkAssets';
import { tailSize } from './constants';

interface CtxRef {
    current: CanvasRenderingContext2D;
}

interface PhysicPlayersRef {
    current: Array<PhysicPlayerTypes.PhysicPlayer>;
}

interface CurrentPlayerRef {
    current: number;
}

interface EndRef {
    current: boolean;
}

interface MapRef {
    current: GameMapTypes.GameMap;
}

interface CanvasRef {
    current: HTMLCanvasElement;
}

const draw = (
    ctxRef: CtxRef,
    physicPlayersRef: PhysicPlayersRef,
    currentPlayerRef: CurrentPlayerRef,
    endRef: EndRef,
    mapRef: MapRef,
    canvasRef: CanvasRef
) => {
    const end = endRef.current;
    if (!end) {
        const ctx = ctxRef.current;
        const physicPlayers = physicPlayersRef.current;
        const currentPlayer = currentPlayerRef.current;
        const map = mapRef.current;
        const canvas = canvasRef.current;

        const player = physicPlayers[currentPlayer];

        const canvasWidth = canvas.clientWidth;
        const canvasHeight = canvas.clientHeight;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        map.chunks.forEach((col, y) => {
            col.forEach((num, x) => {
                const chunk = chunkAssets[num];

                ctx.drawImage(
                    chunk.image,
                    canvasWidth / 2 -
                        player.width / 2 +
                        x * tailSize -
                        player.x,
                    canvasHeight / 2 -
                        player.height / 2 +
                        y * tailSize -
                        player.y,
                    tailSize,
                    tailSize
                );
            });
        });

        physicPlayers.forEach((playerItem, i) => {
            if (i === currentPlayer) return;

            ctx.beginPath();
            ctx.arc(
                canvasWidth / 2 + playerItem.x - player.x,
                canvasHeight / 2 + playerItem.y - player.y,
                playerItem.width / 2,
                0,
                2 * Math.PI,
                false
            );
            ctx.fillStyle = playerItem.color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.fillStyle = 'white';
            ctx.font = '20px serif';
            ctx.fillText(
                playerItem.name,
                canvasWidth / 2 +
                    playerItem.x -
                    player.x -
                    playerItem.width / 2,
                canvasHeight / 2 + playerItem.y - player.y + playerItem.height
            );
        });

        ctx.beginPath();
        ctx.arc(
            canvasWidth / 2,
            canvasHeight / 2,
            player.width / 2,
            0,
            2 * Math.PI,
            false
        );
        ctx.fillStyle = player.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.font = '20px serif';
        ctx.fillText(
            player.name,
            canvasWidth / 2 - player.width / 2,
            canvasHeight / 2 + player.height
        );

        requestAnimationFrame(() =>
            draw(
                ctxRef,
                physicPlayersRef,
                currentPlayerRef,
                endRef,
                mapRef,
                canvasRef
            )
        );
    }
};

export { draw };
