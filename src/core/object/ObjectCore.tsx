import { useEffect } from 'react';
import { tilesInit, tiles } from './tiles';
import { setMap } from 'src/redux/HUDReducer';
import { gameMap } from './gameMap';
import { useAppDispatch } from 'src/redux/hooks';

function ObjectCore() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        tilesInit();
        dispatch(setMap(gameMap.getSerializableObject()));
    }, []);

    return <></>;
}

export { ObjectCore };
