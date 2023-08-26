import { useEffect, useRef } from 'react';
import { FC } from 'react';
import s from './Moving.module.scss';
import { useMoveBtns } from '../hooks';
import { KeyVector, PlayerPhysics } from 'src/types/movement';
import { setPlayerPhysics } from 'src/redux/HUDReducer';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { ObjectTypes } from 'src/types';
import { getPlayerByMoveKey, getMovedPlayer } from './utils';

interface Props {
    visibilityMode: boolean;
}

const Moving: FC<Props> = (props) => {
    const moveKeysStack: KeyVector = useMoveBtns();
    const player = useAppSelector(
        (state) => state.coreStateReducer.player.physics
    );
    const { map } = useAppSelector((state) => state.coreStateReducer);
    const dispatch = useAppDispatch();
    const mapRef = useRef<ObjectTypes.GameMapObj>(map);
    const playerRef = useRef<PlayerPhysics>(player);

    useEffect(() => {
        playerRef.current = player;
    }, [player]);

    useEffect(() => {
        mapRef.current = map;
    }, [map]);

    useEffect(() => {
        dispatch(setPlayerPhysics(getPlayerByMoveKey(player, moveKeysStack)));
    }, [moveKeysStack]);

    useEffect(() => {
        const timerId = setInterval(() => {
            dispatch(setPlayerPhysics(getMovedPlayer(playerRef, mapRef)));
        }, 10);

        return () => clearInterval(timerId);
    }, []);

    return (
        <div
            tabIndex={0}
            style={{ display: props.visibilityMode ? 'flex' : 'none' }}
            className={s.movingCore}
        ></div>
    );
};

export { Moving };
