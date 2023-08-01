import {useCallback} from "react";
import {Button} from "@mui/material";

import {closeMainMenu, coreStateSelector} from "../../../../redux/slicer";
import {useAppSelector, useAppDispatch} from "../../../../redux/hooks";

import s from "./style.scss"

function MainMenu() {
    const selectedCoreStateSelector = useAppSelector(coreStateSelector);
    const dispatch = useAppDispatch();

    const handleStart = useCallback(() => {
        dispatch(closeMainMenu());
    }, [dispatch]);

    return (
        <div className={s.menuContainer}>
            <Button onClick={handleStart}>Начать</Button>
            <Button>Настройки</Button>
            <Button>Выход</Button>
        </div>
    )
}

export {MainMenu};
