import { FC, useRef, useEffect } from 'react';

import s from './GraphicCore.module.scss';
import { useAppSelector } from 'src/redux/hooks';
import { GameMapTypes, PhysicPlayerTypes } from 'src/types';
import { draw } from './draw';

const GraphicCore: FC = () => {
    const { physicPlayers, currentPlayer, map } = useAppSelector(
        (state) => state.coreStateReducer.objects
    );

    const physicPlayersRef = useRef(physicPlayers);
    const currentPlayerRef = useRef(currentPlayer);
    const mapRef = useRef(map);
    const endRef = useRef(false);
    const ctxRef = useRef(null);

    useEffect(() => {
        physicPlayersRef.current = physicPlayers;
    }, [physicPlayers]);

    useEffect(() => {
        currentPlayerRef.current = currentPlayer;
    }, [currentPlayer]);

    useEffect(() => {
        mapRef.current = map;
    }, [map]);

    const canvasRef = useRef(null);

    useEffect(() => {
        const startDraw = () => {
            const physicPlayers: Array<PhysicPlayerTypes.PhysicPlayer> =
                physicPlayersRef.current;
            const map: GameMapTypes.GameMap = mapRef.current;
            const currentPlayer: number = currentPlayerRef.current;
            const canvas: HTMLCanvasElement = canvasRef.current;

            if (
                physicPlayers.length &&
                map &&
                currentPlayer !== null &&
                canvas
            ) {
                ctxRef.current = canvas.getContext('2d');
                requestAnimationFrame(() =>
                    draw(
                        ctxRef,
                        physicPlayersRef,
                        currentPlayerRef,
                        endRef,
                        mapRef,
                        canvasRef
                    )
                );
            } else {
                setTimeout(() => {
                    startDraw();
                }, 100);
            }
        };
        startDraw();
        return () => {
            endRef.current = true;
        };
    }, []);

    return (
        <div className={s.graphicCore}>
            <canvas ref={canvasRef} width={500} height={500}></canvas>
        </div>
    );
};

export { GraphicCore };
