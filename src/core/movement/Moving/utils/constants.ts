import { mouseTest, playerTest } from 'src/core/types/movementCore'

const chunk = 1000

const directionObj = new Map([
    ['➚', 'Право-верх'],
    ['⬉', 'Лево-верх'],
    ['🠕', 'Верх'],
    ['⬊', 'Право-низ'],
    ['⬋', 'Лево-низ'],
    ['🠔', 'Лево'],
    ['🠖', 'Право'],
    ['🠗', 'Низ'],
    ['STOP', 'Без направления'],
])

const currentPlayer: playerTest = {
    width: 64,
    height: 64,
    xPositionPx: 0,
    yPositionPx: 0,
    direction: '🠗',
    baseSpeedPxPerSecond: 200,
    baseSpeedChunkPerSecond: 200 / chunk,
    state: 'Стоит',
    speedPxPerSecond: 0,
    speedChunkPerSecond: 0,

    xSpeedPxPerSecond: 0,
    ySpeedPxPerSecond: 0,
    xSpeedChunkPerSecond: 0,
    ySpeedChunkPerSecond: 0,

    xPositionChunk: 0,
    yPositionChunk: 0,
}

const currentMouse: mouseTest = {
    screenXPositionPx: 0,
    screenYPositionPx: 0,
    screenXPositionChunk: 0,
    screenYPositionChunk: 0,
    mapXPositionPx: 0,
    mapYPositionPx: 0,
    mapXPositionChunk: 0,
    mapYPositionChunk: 0,
}

export { chunk, directionObj, currentPlayer, currentMouse }
