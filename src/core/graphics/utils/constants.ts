import PlayerImg from 'src/assets/user.svg';

const canvasWidth = 600;
const canvasHeight = 600;

const playerTexture = new Image();
playerTexture.src = PlayerImg;

const initZIndex = 10;
const visibleZDiff = 3;
const opacityZDiff = 1;

export {
    canvasWidth,
    canvasHeight,
    playerTexture,
    initZIndex,
    visibleZDiff,
    opacityZDiff,
};
