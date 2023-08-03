import {useCallback, useState} from "react";
import {Button} from "@mui/material";

import {InterfaceCore} from "./core";

import {playSound} from "./core/audio";
import utils from "./utils";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {addBag, coreStateSelector} from "./redux/HUDReducer";

import s from './style.scss';
import {InitScreen} from "./core/interface/menu/init-screen";
import {MovementCore} from "./core/movement";

function Game() {
    const selectedCoreStateSelector = useAppSelector(coreStateSelector);

    return (
        <div>
            {!selectedCoreStateSelector.interface.HUD.initedProcess && <InitScreen/>}
            {!selectedCoreStateSelector.interface.menu.main && <MovementCore visibilityMode />}
            <InterfaceCore/>
        </div>
    )
}

export {Game};
