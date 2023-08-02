import { useContext } from 'react';
import { MoveContext } from '../move-btns';
import { keyVector } from 'src/core/types/movementCore';

const useMoveBtns = () => {
  const moveKeysStack: keyVector = useContext(MoveContext);
  return moveKeysStack;
};

export { useMoveBtns };
