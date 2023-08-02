import { FC } from 'react';

import { roundNumber } from '../../utils';
import { mouseTest, playerTest } from 'src/core/types/movementCore';

import standingImg from '../../assets/svg/standing.svg';
import movingImg from '../../assets/svg/standing.svg';
import playerImg from '../../assets/svg/user.svg';

import s from './MidRow.module.scss';

interface props {
  player: playerTest;
  mouse: mouseTest;
}

const MidRow: FC<props> = ({ player, mouse }) => {
  return (
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
  );
};

export { MidRow };
