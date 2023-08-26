import { useContext } from 'react';
import { MoveContext } from '../move-btns';
import { KeyVector } from 'src/types/movement';

const useMoveBtns = () => {
    const moveKeysStack: KeyVector = useContext(MoveContext);
    return moveKeysStack;
};

export { useMoveBtns };
