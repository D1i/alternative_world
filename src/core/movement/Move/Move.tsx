import { FC, useEffect, useRef, useState } from 'react';
import { useMoveBtns } from '../hooks';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { showVector } from '../move-btns/utils';
import { GameMapTypes, PhysicPlayerTypes } from 'src/types';
import { setPhysicPlayer } from 'src/redux/HUDReducer';
import { getCollizion } from './getCollizion';

const diag = 1 / Math.sqrt(2);

const Move: FC = () => {
    const moveBtns = useMoveBtns();
    const { currentPlayer, physicPlayers, map } = useAppSelector(
        (state) => state.coreStateReducer.objects
    );
    const [vectorSpeed, setVectorSpeed] = useState<Array<number>>([0, 0]);

    const vectorSpeedRef = useRef<Array<number>>(vectorSpeed);
    const currentPlayerRef = useRef<number>(currentPlayer);
    const physicPlayersRef =
        useRef<Array<PhysicPlayerTypes.PhysicPlayer>>(physicPlayers);
    const mapRef = useRef<GameMapTypes.GameMap>(map);

    const dateRef = useRef(new Date());

    const dispatch = useAppDispatch();

    useEffect(() => {
        vectorSpeedRef.current = vectorSpeed;
    }, [vectorSpeed]);

    useEffect(() => {
        currentPlayerRef.current = currentPlayer;
    }, [currentPlayer]);

    useEffect(() => {
        physicPlayersRef.current = physicPlayers;
    }, [physicPlayers]);

    useEffect(() => {
        mapRef.current = map;
    }, [map]);

    useEffect(() => {
        const vector = showVector(moveBtns);

        switch (vector) {
            case '🠕':
                setVectorSpeed([0, -1]);
                break;
            case '➚':
                setVectorSpeed([diag, -diag]);
                break;
            case '🠖':
                setVectorSpeed([1, 0]);
                break;
            case '⬊':
                setVectorSpeed([diag, diag]);
                break;
            case '🠗':
                setVectorSpeed([0, 1]);
                break;
            case '🠔':
                setVectorSpeed([-1, 0]);
                break;
            case '⬋':
                setVectorSpeed([-diag, diag]);
                break;
            case '⬉':
                setVectorSpeed([-diag, -diag]);
                break;

            default:
                setVectorSpeed([0, 0]);
        }
    }, [moveBtns]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const millisec = dateRef.current.getTime();
            const currentDate = new Date();
            const currentMillisec = currentDate.getTime();
            const delta = currentMillisec - millisec;
            dateRef.current = currentDate;

            const currentPlayer = currentPlayerRef.current;
            const physicPlayers = physicPlayersRef.current;
            const vectorSpeed = vectorSpeedRef.current;

            if (currentPlayer !== null && physicPlayers.length) {
                const player = physicPlayers[currentPlayer];

                const speed = player.speed;

                const x = player.x + (vectorSpeed[0] * speed * delta) / 1000;
                const y = player.y + (vectorSpeed[1] * speed * delta) / 1000;

                const [collizion, horisontalCollizion, verticalCollizion] =
                    getCollizion(
                        x,
                        y,
                        player.width,
                        player.height,
                        map,
                        player.x,
                        player.y
                    );

                if (collizion) {
                    if (horisontalCollizion && !verticalCollizion) {
                        dispatch(
                            setPhysicPlayer({
                                index: currentPlayer,
                                data: { ...player, x, y: player.y },
                            })
                        );
                    } else if (!horisontalCollizion && verticalCollizion) {
                        dispatch(
                            setPhysicPlayer({
                                index: currentPlayer,
                                data: { ...player, x: player.x, y },
                            })
                        );
                    } else {
                        dispatch(
                            setPhysicPlayer({
                                index: currentPlayer,
                                data: { ...player, x: player.x, y: player.y },
                            })
                        );
                    }
                } else {
                    dispatch(
                        setPhysicPlayer({
                            index: currentPlayer,
                            data: { ...player, x, y },
                        })
                    );
                }
            }
        }, 10);
        return () => {
            clearInterval(intervalId);
        };
    });

    return <></>;
};

export { Move };
