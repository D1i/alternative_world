import { FC, useEffect } from 'react';
import { physicPlayers } from 'src/API';
import {
    setCurrentPlayer,
    setMap,
    setPhysicPlayers,
} from 'src/redux/HUDReducer';
import { useAppDispatch } from 'src/redux/hooks';
import { gameMap } from './gameMap';

const ObjectCore: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPhysicPlayers(physicPlayers));
        dispatch(setCurrentPlayer(0));
        dispatch(setMap(gameMap));
    }, []);

    return <></>;
};

export { ObjectCore };
