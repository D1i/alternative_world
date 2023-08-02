type keyWASD = 'KeyW' | 'KeyA' | 'KeyS' | 'KeyD';

type keyVector = keyWASD[];

type directionVector = '➚' | '⬉' | '🠕' | '⬊' | '⬋' | '🠔' | '🠖' | '🠗' | 'STOP';
type playerState = 'Стоит' | 'Движется';

interface playerTest {
  width: number;
  height: number;
  xPositionPx: number;
  yPositionPx: number;
  direction: directionVector;
  baseSpeedPxPerSecond: number;
  state: playerState;
  baseSpeedChunkPerSecond: number;
  speedPxPerSecond: number;
  speedChunkPerSecond: number;
  xSpeedPxPerSecond: number;
  ySpeedPxPerSecond: number;
  xSpeedChunkPerSecond: number;
  ySpeedChunkPerSecond: number;
  xPositionChunk: number;
  yPositionChunk: number;
}

interface mouseTest {
  screenXPositionPx: number;
  screenYPositionPx: number;
  screenXPositionChunk: number;
  screenYPositionChunk: number;
  mapXPositionPx: number;
  mapYPositionPx: number;
  mapXPositionChunk: number;
  mapYPositionChunk: number;
}

export { keyVector, directionVector, playerState, playerTest, mouseTest };
