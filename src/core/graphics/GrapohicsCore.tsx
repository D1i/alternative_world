import { useRef, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
import { PlayerPhysics } from 'src/types/movement';
import { ObjectTypes } from 'src/types';
import { setMouse } from 'src/redux/HUDReducer';
import { animate, canvasWidth, canvasHeight, getMouse } from './utils';

import s from './GraphicsCore.module.scss';

function GraphicsCore() {
    const { map } = useAppSelector((state) => state.coreStateReducer);
    const dispatch = useAppDispatch();
    const physicsPlayer = useAppSelector(
        (state) => state.coreStateReducer.player.physics
    );
    const canvasRef = useRef<null | HTMLCanvasElement>(null);
    const playerRef = useRef<PlayerPhysics>(physicsPlayer);
    const mapRef = useRef<ObjectTypes.GameMapObj>(map);
    const renderStateRef = useRef<boolean>(true);

    useEffect(() => {
        playerRef.current = physicsPlayer;
        mapRef.current = map;
    }, [physicsPlayer, map]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.setTransform(
            0.866,
            -0.5,
            0.866,
            0.5,
            -canvasRef.current.width / 2 + playerRef.current.size.x,
            canvasRef.current.height / 2 + 0
        );

        requestAnimationFrame(() =>
            animate(ctx, playerRef, mapRef, renderStateRef)
        );

        return () => {
            renderStateRef.current = false;
        };
    }, []);

    const onMouseMoveHeandler = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
            dispatch(setMouse(getMouse(e, physicsPlayer)));
        },
        []
    );

    return (
        <div className={s.graphics}>
            <canvas
                onMouseMove={onMouseMoveHeandler}
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                style={{
                    width: canvasWidth,
                    height: canvasHeight,
                }}
            ></canvas>
        </div>
    );
}

export { GraphicsCore };
