type DirectionVector = '➚' | '⬉' | '🠕' | '⬊' | '⬋' | '🠔' | '🠖' | '🠗' | 'STOP';
type PlayerState = 'stand' | 'move';

interface PhysicPlayer {
    id: number;
    name: string;
    speed: number;
    direction: DirectionVector;
    state: PlayerState;
    width: number;
    height: number;
    color: string;
    x: number;
    y: number;
}

export { PhysicPlayer, DirectionVector, PlayerState };
