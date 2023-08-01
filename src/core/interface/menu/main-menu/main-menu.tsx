import {useCallback, useState} from "react";
import {Button} from "@mui/material";

import {closeMainMenu, coreStateSelector} from "../../../../redux/slicer";
import {useAppSelector, useAppDispatch} from "../../../../redux/hooks";

import s from "./style.scss"
import {Settings} from "./settings";

const POSITIONS = {
    MENU: 'menu',
    SETTINGS: 'settings',
}

function MainMenu() {
    const [currentPosition, setCurrentPosition] = useState(POSITIONS.MENU);
    const selectedCoreStateSelector = useAppSelector(coreStateSelector);
    const dispatch = useAppDispatch();

    const handleStart = useCallback(() => {
        dispatch(closeMainMenu());
    }, [dispatch]);

    const handleBack = useCallback(() => {
        setCurrentPosition(POSITIONS.MENU);
    }, []);

    const handleOpenSettings = useCallback(() => {
        setCurrentPosition(POSITIONS.SETTINGS);
    }, []);

    if (currentPosition === POSITIONS.MENU) {
        return (
            <div className={s.menuContainer}>
                <Button onClick={handleStart}>Начать</Button>
                <Button onClick={handleOpenSettings}>Настройки</Button>
                <Button>Выход</Button>
            </div>
        )
    } else if (currentPosition === POSITIONS.SETTINGS) {
        return (
            <div className={s.menuContainer}>
                <Settings handleBack={handleBack}/>
            </div>
        )
    }
}

export {MainMenu};
