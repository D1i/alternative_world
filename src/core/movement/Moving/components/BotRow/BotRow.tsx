import { FC } from 'react';

import { roundNumber } from '../../utils';

import { playerTest } from 'src/core/types/movementCore';

import s from './BotRow.module.scss';

interface props {
  player: playerTest;
}

const BotRow: FC<props> = ({ player }) => {
  return (
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
  );
};

export { BotRow };
