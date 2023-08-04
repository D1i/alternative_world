import { useCallback, useState } from 'react'
import { Button } from '@mui/material'

import { closeMainMenu, coreStateSelector } from '../../../../redux/HUDReducer'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks'

import { Settings } from './settings'

import s from './style.scss'

const POSITIONS = {
    MENU: 'menu',
    SETTINGS: 'settings',
}

function MainMenu() {
    const [currentPosition, setCurrentPosition] = useState(POSITIONS.MENU)
    const dispatch = useAppDispatch()

    const handleStart = useCallback(() => {
        dispatch(closeMainMenu())
    }, [dispatch])

    const handleBack = useCallback(() => {
        setCurrentPosition(POSITIONS.MENU)
    }, [])

    const handleOpenSettings = useCallback(() => {
        setCurrentPosition(POSITIONS.SETTINGS)
    }, [])

    const handleExit = useCallback(() => {
        window.close()
    }, [])

    if (currentPosition === POSITIONS.MENU) {
        return (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            <div className={s.menuContainer}>
                <Button onClick={handleStart}>Начать</Button>
                <Button onClick={handleOpenSettings}>Настройки</Button>
                <Button onClick={handleExit}>Выход</Button>
            </div>
        )
    } else if (currentPosition === POSITIONS.SETTINGS) {
        return (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            <div className={s.menuContainer}>
                <Settings handleBack={handleBack} />
            </div>
        )
    }
}

export { MainMenu }
