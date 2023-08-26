type KeyWASD = 'KeyW' | 'KeyA' | 'KeyS' | 'KeyD';
type KeyVector = KeyWASD[];
type DirectionVector = '➚' | '⬉' | '🠕' | '⬊' | '⬋' | '🠔' | '🠖' | '🠗' | 'STOP';
type PlayerState = 'Stand' | 'Move';

interface Mouse {
    screenX: number;
    screenY: number;
    mapX: number;
    mapY: number;
}

interface PlayerPhysics {
    size: {
        x: number;
        y: number;
        z: number;
    };

    position: {
        x: number;
        y: number;
        z: number;
    };

    speed: {
        base: number;
        x: number;
        y: number;
        z: number;
    };

    falling: boolean;
    direction: DirectionVector;
    state: PlayerState;
}

export { KeyVector, DirectionVector, PlayerState, Mouse, PlayerPhysics };
