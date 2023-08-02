import { useEffect, useState } from 'react';
import s from './MovingCore.module.scss';
import { useMoveBtns } from '../hooks';
import { showVector } from '../move-btns/utils';

import playerImg from './assets/svg/user.svg';
import standingImg from './assets/svg/standing.svg';
import movingImg from './assets/svg/moving.svg';

const chunk = 1000;

const diagonalSpd = (speed: number) => speed / 2 ** (1 / 2);

const roundNumber = (num: number, index: number) => {
  const value: number = 10 ** index;
  return Math.round(num * value) / value;
};

const getSpeedComponents = (speed: number, direction: string) => {
  switch (direction) {
    case '➚':
      return [diagonalSpd(speed), diagonalSpd(speed)];
    case '⬉':
      return [-diagonalSpd(speed), diagonalSpd(speed)];
    case '🠕':
      return [0, speed];
    case '⬊':
      return [diagonalSpd(speed), -diagonalSpd(speed)];
    case '⬋':
      return [-diagonalSpd(speed), -diagonalSpd(speed)];
    case '🠔':
      return [-speed, 0];
    case '🠖':
      return [speed, 0];
    case '🠗':
      return [0, -speed];
    case 'STOP':
      return [0, 0];
    default:
      return [0, 0];
  }
};

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
]);

const currentPlayer = {
  width: 64,
  height: 64,
  xPositionPx: 0,
  yPositionPx: 0,
  direction: '🠗',
  baseSpeedPxPerSecond: 200,
  state: 'Стоит',

  get baseSpeedChunkPerSecond() {
    return this.baseSpeedPxPerSecond / chunk;
  },

  speedPxPerSecond: 0,
  speedChunkPerSecond: 0,

  xSpeedPxPerSecond: 0,
  ySpeedPxPerSecond: 0,
  xSpeedChunkPerSecond: 0,
  ySpeedChunkPerSecond: 0,

  xPositionChunk: 0,
  yPositionChunk: 0,
};

const currentMouse = {
  screenXPositionPx: 0,
  screenYPositionpx: 0,
  screenXPositionChunk: 0,
  screenYPositionChunk: 0,
  mapXPostionPx: 0,
  mapYPositionPx: 0,
  mapXPostionChunk: 0,
  mapYPositionChunk: 0,
};

const Moving = () => {
  const [player, setPlayer] = useState(currentPlayer);
  const [mouse, setMouse] = useState(currentMouse);
  const moveKeysStack = useMoveBtns();

  useEffect(() => {
    setPlayer((player) => {
      const vector = showVector(moveKeysStack);
      const direction = vector === 'STOP' ? player.direction : vector;
      const state = vector === 'STOP' ? 'Стоит' : 'Движется';

      const speedPxPerSecond =
        state === 'Стоит' ? 0 : player.baseSpeedPxPerSecond;
      const speedChunkPerSecond =
        state === 'Стоит' ? 0 : player.baseSpeedChunkPerSecond;

      const [xSpeedPxPerSecond, ySpeedPxPerSecond] = getSpeedComponents(
        speedPxPerSecond,
        direction
      );

      const [xSpeedChunkPerSecond, ySpeedChunkPerSecond] = getSpeedComponents(
        speedChunkPerSecond,
        direction
      );

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
      };
    });
  }, [moveKeysStack]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setPlayer((player) => {
        const xPositionPx = player.xPositionPx + player.xSpeedPxPerSecond / 100;
        const yPositionPx = player.yPositionPx + player.ySpeedPxPerSecond / 100;
        const xPositionChunk = xPositionPx / chunk;
        const yPositionChunk = yPositionPx / chunk;

        setMouse((mouse) => {
          const mapXPositionPx = mouse.screenXPositionPx + player.xPositionPx;
          const mapYPositionPx = mouse.screenYPositionPx + player.yPositionPx;

          const mapXPositionChunk = mapXPositionPx / chunk;
          const mapYPositionChunk = mapYPositionPx / chunk;

          return {
            ...mouse,
            mapXPositionPx,
            mapYPositionPx,
            mapXPositionChunk,
            mapYPositionChunk,
          };
        });

        return {
          ...player,
          xPositionPx,
          yPositionPx,
          xPositionChunk,
          yPositionChunk,
        };
      });
    }, 10);

    return () => clearInterval(timerId);
  }, []);

  const onMouseMoveHeandler = (e) => {
    const screenXPositionPx = e.screenX;
    const screenYPositionPx = e.screenY;

    const screenXPositionChunk = screenXPositionPx / chunk;
    const screenYPositionChunk = screenYPositionPx / chunk;

    const mapXPositionPx = screenXPositionPx + player.xPositionPx;
    const mapYPositionPx = screenYPositionPx + player.yPositionPx;

    const mapXPositionChunk = mapXPositionPx / chunk;
    const mapYPositionChunk = mapYPositionPx / chunk;

    setMouse({
      screenXPositionPx,
      screenYPositionPx,
      screenXPositionChunk,
      screenYPositionChunk,
      mapXPositionPx,
      mapYPositionPx,
      mapXPositionChunk,
      mapYPositionChunk,
    });
  };

  return (
    <div onMouseMove={(e) => onMouseMoveHeandler(e)} className={s.movingCore}>
      <div className={s.topRow}>
        <div>
          <span>Позиция игрока в пикселях</span>
          <span>X: {roundNumber(player.xPositionPx, 3)}</span>
          <span>Y: {roundNumber(player.xPositionPx, 3)}</span>
        </div>
        <div>
          <span>Позиция игрока в чанках</span>
          <span>X: {roundNumber(player.xPositionChunk, 3)}</span>
          <span>Y: {roundNumber(player.yPositionChunk, 3)}</span>
        </div>
        <div className={s.direct}>{player.direction}</div>
        <span className={s.directText}>
          {directionObj.get(player.direction)}
        </span>
      </div>
      <div className={s.midRow}>
        <div className={s.direction}>
          <span>Длина: {player.width}</span>
          <span>Высота: {player.height}</span>
          <span>Состояние: </span>
          <span>{player.state}</span>
          <img
            className={s.moveImg}
            src={player.state === 'Стоит' ? standingImg : movingImg}
            alt={player.state}
          />
        </div>
        <div
          style={{
            width: `${player.width}px`,
            height: `${player.height}px`,
          }}
          className={s.player}
        >
          <img src={playerImg} alt="player" />
        </div>
        <div className={s.mouse}>
          <div>
            <span>
              X позиция мыши в пикселях относительно игрока:{' '}
              {roundNumber(mouse.screenXPositionPx, 3)}
            </span>
            <span>
              Y позиция мыши в пикселях относительно игрока:{' '}
              {roundNumber(mouse.screenYPositionPx, 3)}
            </span>
          </div>
          <div>
            <span>
              X позиция мыши в чанках относительно игрока:{' '}
              {roundNumber(mouse.screenXPositionChunk, 3)}
            </span>
            <span>
              Y позиция мыши в чанках относительно игрока:{' '}
              {roundNumber(mouse.screenYPositionChunk, 3)}
            </span>
          </div>
          <div>
            <span>
              X позиция мыши в пикселях относительно карты:{' '}
              {roundNumber(mouse.mapXPositionPx, 3)}
            </span>
            <span>
              Y позиция мыши в пикселях относительно карты:{' '}
              {roundNumber(mouse.mapYPositionPx, 3)}
            </span>
          </div>
          <div>
            <span>
              X позиция мыши в чанках относительно карты:{' '}
              {roundNumber(mouse.mapXPositionChunk, 3)}
            </span>
            <span>
              Y позиция мыши в чанках относительно карты:{' '}
              {roundNumber(mouse.mapYPositionChunk, 3)}
            </span>
          </div>
        </div>
      </div>

      <div className={s.botRow}>
        <div className={s.speed}>
          <div>
            Скорость в пикселях за секунду:{' '}
            {roundNumber(player.speedPxPerSecond, 3)}
          </div>
          <div>
            Скорость в чанках за секунду:{' '}
            {roundNumber(player.speedChunkPerSecond, 3)}
          </div>
        </div>
        <div className={s.speed}>
          <div>
            Скорость по X в пикселях за секунду:
            {roundNumber(player.xSpeedPxPerSecond, 3)}
          </div>
          <div>
            Скорость по Y в пикселях за секунду:
            {roundNumber(player.ySpeedPxPerSecond, 3)}
          </div>
        </div>
        <div className={s.speed}>
          <div>
            Скорость по X в чанках за секунду:
            {roundNumber(player.xSpeedChunkPerSecond, 3)}
          </div>
          <div>
            Скорость по Y в чанках за секунду:
            {roundNumber(player.ySpeedChunkPerSecond, 3)}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Moving };
