import { useEffect, useState, useCallback } from 'react'
import { FC } from 'react'
import s from './Moving.module.scss'
import { useMoveBtns } from '../hooks'

import { keyVector, playerTest, mouseTest } from 'src/core/types/movementCore'

import {
    currentPlayer,
    currentMouse,
    setPlayerMove,
    setPlayerPosition,
    setMouseMapPosition,
    setMousePosition,
} from './utils'
import { BotRow, MidRow, TopRow } from './components'

interface props {
    visibilityMode: boolean
}

const Moving: FC<props> = (props) => {
    const [player, setPlayer] = useState<playerTest>(currentPlayer)
    const [mouse, setMouse] = useState<mouseTest>(currentMouse)
    const moveKeysStack: keyVector = useMoveBtns()

    useEffect(() => {
        setPlayer((player: playerTest) => setPlayerMove(player, moveKeysStack))
    }, [moveKeysStack])

    useEffect(() => {
        const timerId = setInterval(() => {
            setPlayer((player: playerTest) => {
                setMouse((mouse: mouseTest) =>
                    setMouseMapPosition(mouse, player)
                )
                return setPlayerPosition(player)
            })
        }, 10)

        return () => clearInterval(timerId)
    }, [])

    const onMouseMoveHeandler = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setMouse(() => setMousePosition(e, player))
        },
        []
    )

    return (
        <div
            style={{ display: props.visibilityMode ? 'flex' : 'none' }}
            onMouseMove={(e) => onMouseMoveHeandler(e)}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            className={s.movingCore}
        >
            <TopRow player={player} />
            <MidRow player={player} mouse={mouse} />
            <BotRow player={player} />
        </div>
    )
}

export { Moving }
