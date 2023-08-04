import { showVector } from '../../move-btns/utils'
import { chunk } from './constants'

import {
    keyVector,
    directionVector,
    playerState,
    playerTest,
    mouseTest,
} from 'src/core/types/movementCore'

const diagonalSpd = (speed: number) => speed / 2 ** (1 / 2)

const roundNumber = (num: number, index: number) => {
    const value: number = 10 ** index
    return Math.round(num * value) / value
}

const getSpeedComponents = (speed: number, direction: string) => {
    switch (direction) {
        case '➚':
            return [diagonalSpd(speed), diagonalSpd(speed)]
        case '⬉':
            return [-diagonalSpd(speed), diagonalSpd(speed)]
        case '🠕':
            return [0, speed]
        case '⬊':
            return [diagonalSpd(speed), -diagonalSpd(speed)]
        case '⬋':
            return [-diagonalSpd(speed), -diagonalSpd(speed)]
        case '🠔':
            return [-speed, 0]
        case '🠖':
            return [speed, 0]
        case '🠗':
            return [0, -speed]
        case 'STOP':
            return [0, 0]
        default:
            return [0, 0]
    }
}

const setPlayerMove = (player: playerTest, moveKeysStack: keyVector) => {
    const vector: directionVector = showVector(moveKeysStack)

    const direction: directionVector =
        vector === 'STOP' ? player.direction : vector
    const state: playerState = vector === 'STOP' ? 'Стоит' : 'Движется'

    const speedPxPerSecond: number =
        state === 'Стоит' ? 0 : player.baseSpeedPxPerSecond
    const speedChunkPerSecond: number =
        state === 'Стоит' ? 0 : player.baseSpeedChunkPerSecond

    const [xSpeedPxPerSecond, ySpeedPxPerSecond] = getSpeedComponents(
        speedPxPerSecond,
        direction
    )

    const [xSpeedChunkPerSecond, ySpeedChunkPerSecond] = getSpeedComponents(
        speedChunkPerSecond,
        direction
    )

    return {
        ...player,
        direction,
        state,
        speedPxPerSecond,
        speedChunkPerSecond,
        xSpeedPxPerSecond,
        ySpeedPxPerSecond,
        xSpeedChunkPerSecond,
        ySpeedChunkPerSecond,
    }
}

const setPlayerPosition = (player: playerTest) => {
    const xPositionPx: number =
        player.xPositionPx + player.xSpeedPxPerSecond / 100
    const yPositionPx: number =
        player.yPositionPx + player.ySpeedPxPerSecond / 100
    const xPositionChunk: number = xPositionPx / chunk
    const yPositionChunk: number = yPositionPx / chunk

    return {
        ...player,
        xPositionPx,
        yPositionPx,
        xPositionChunk,
        yPositionChunk,
    }
}

const setMouseMapPosition = (mouse: mouseTest, player: playerTest) => {
    const mapXPositionPx: number = mouse.screenXPositionPx + player.xPositionPx
    const mapYPositionPx: number = mouse.screenYPositionPx + player.yPositionPx

    const mapXPositionChunk: number = mapXPositionPx / chunk
    const mapYPositionChunk: number = mapYPositionPx / chunk

    return {
        ...mouse,
        mapXPositionPx,
        mapYPositionPx,
        mapXPositionChunk,
        mapYPositionChunk,
    }
}

const setMousePosition = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    player: playerTest
) => {
    const { pageX, pageY } = e
    const { clientWidth, clientHeight } = document.documentElement

    const screenXPositionPx: number = pageX - clientWidth / 2
    const screenYPositionPx: number = pageY - clientHeight / 2

    const screenXPositionChunk: number = screenXPositionPx / chunk
    const screenYPositionChunk: number = screenYPositionPx / chunk

    const mapXPositionPx: number = screenXPositionPx + player.xPositionPx
    const mapYPositionPx: number = screenYPositionPx + player.yPositionPx

    const mapXPositionChunk: number = mapXPositionPx / chunk
    const mapYPositionChunk: number = mapYPositionPx / chunk

    return {
        screenXPositionPx,
        screenYPositionPx,
        screenXPositionChunk,
        screenYPositionChunk,
        mapXPositionPx,
        mapYPositionPx,
        mapXPositionChunk,
        mapYPositionChunk,
    }
}

export {
    diagonalSpd,
    roundNumber,
    getSpeedComponents,
    setPlayerMove,
    setPlayerPosition,
    setMouseMapPosition,
    setMousePosition,
}
