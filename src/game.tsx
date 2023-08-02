import {useCallback, useState} from "react";
import {Button} from "@mui/material";

import {InterfaceCore} from "./core";

import {playSound} from "./core/audio";
import utils from "./utils";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {addBag, coreStateSelector} from "./redux/HUDReducer";

import s from './style.scss';
import {InitScreen} from "./core/interface/menu/init-screen";

function Game() {
    const selectedCoreStateSelector = useAppSelector(coreStateSelector);

    return (
        <div>
            {/*<AudioCore />
            <InterfaceCore />
            <MovementCore />*/}
            {!selectedCoreStateSelector.interface.HUD.initedProcess && <InitScreen/>}
            <InterfaceCore/>
        </div>
    )
}

export {Game};
