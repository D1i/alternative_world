import { PlayerPhysics } from 'src/types/movement';

const getMouse = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    physicsPlayer: PlayerPhysics
) => {
    const { clientWidth, clientHeight } = document.documentElement;
    const currentScreenX = e.screenX;
    const currentScreenY = e.screenY;
    const { x, y } = physicsPlayer.position;

    const sreenX = currentScreenX - clientWidth / 2;
    const sreenY = -currentScreenY + clientHeight / 2;
    const mapX = sreenX + x;
    const mapY = sreenY + y;

    return { sreenX, sreenY, mapX, mapY };
};

export { getMouse };
