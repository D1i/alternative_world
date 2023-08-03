import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {coreStateSelector} from "../../redux/HUDReducer";

import {MainMenu} from "./menu";
import {HUDCore} from "./HUD";
import {useEffect, useRef} from "react";

function InterfaceCore() {
    const selectedCoreStateSelector = useAppSelector(coreStateSelector);

    if (selectedCoreStateSelector.interface.menu.main) {
        return (
            <div>
                <MainMenu/>
            </div>
        )
    } else {
        return (
            <HUDCore/>
        )
    }
}

export {InterfaceCore};
