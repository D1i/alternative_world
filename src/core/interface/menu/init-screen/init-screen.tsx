import { useCallback, useState } from 'react'
import { Button } from '@mui/material'
import * as classNames from 'classnames'

import { useAppDispatch } from '../../../../redux/hooks'
import { initProcess } from '../../../../redux/HUDReducer'

import s from './style.module.scss'

const F11: number = 122

function InitScreen() {
    const dispatch = useAppDispatch()

    const [initedProcess, setInitedProcess] = useState(false)
    const handleInitGameProcesses = useCallback(() => {
        setTimeout(() => {
            dispatch(initProcess())
        }, 1000)
        setInitedProcess(true)
    }, [])

    const handleInitGameProcessOnKeyDown = useCallback((event) => {
        if (event.keyCode === F11) {
            handleInitGameProcesses()
        }
    }, [])

    return (
        <div
            className={classNames(s.container, initedProcess && s.inited)}
            onKeyDownCapture={handleInitGameProcessOnKeyDown}
            tabIndex={0}
        >
            <div className={s.menuContainer}>
                <div className={s.description}>
                    Для продолжения нажмите либо{' '}
                    <span className={s.keyCode}>F11</span> для перехода
                    полноэкранного режима
                </div>
                <Button variant="contained" onClick={handleInitGameProcesses}>
                    Либо продолжите не переходя в полноэеранный режим
                </Button>
            </div>
        </div>
    )
}

export { InitScreen }
