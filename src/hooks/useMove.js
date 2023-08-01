import { useContext } from 'react';
import { MoveContext } from '../move';

const useMove = () => {
  const moveKeysStack = useContext(MoveContext);
  return moveKeysStack;
};

export { useMove };
