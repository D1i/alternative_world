import {
    DirectionVector,
    KeyVector,
    PlayerPhysics,
    PlayerState,
} from 'src/types/movement';
import { showVector } from '../../move-btns/utils';
import { getSpeedComponents } from './getSpeedComponents';

const getPlayerByMoveKey = (
    player: PlayerPhysics,
    moveKeysStack: KeyVector
): PlayerPhysics => {
    const vector: DirectionVector = showVector(moveKeysStack);

    const direction: DirectionVector =
        vector === 'STOP' ? player.direction : vector;
    const state: PlayerState = vector === 'STOP' ? 'Stand' : 'Move';

    const speed: number = state === 'Stand' ? 0 : player.speed.base;

    const [xSpeed, ySpeed] = getSpeedComponents(speed, direction);

    return {
        ...player,
        direction,
        state,
        speed: {
            ...player.speed,
            x: xSpeed,
            y: ySpeed,
        },
    };
};

export { getPlayerByMoveKey };
