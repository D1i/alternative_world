import { FC } from 'react';

import { roundNumber, directionObj } from '../../utils';
import { playerTest } from 'src/core/types/movementCore';

import s from './TopRow.module.scss';

interface props {
  player: playerTest;
}

const TopRow: FC<props> = ({ player }) => {
  return (
    <div className={s.topRow}>
      <div>
        <span>Позиция игрока в пикселях</span>
        <span>X: {roundNumber(player.xPositionPx, 3)}</span>
        <span>Y: {roundNumber(player.yPositionPx, 3)}</span>
      </div>
      <div>
        <span>Позиция игрока в чанках</span>
        <span>X: {roundNumber(player.xPositionChunk, 3)}</span>
        <span>Y: {roundNumber(player.yPositionChunk, 3)}</span>
      </div>
      <div className={s.direct}>{player.direction}</div>
      <span className={s.directText}>{directionObj.get(player.direction)}</span>
    </div>
  );
};

export { TopRow };
