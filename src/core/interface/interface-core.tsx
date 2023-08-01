import {useAppSelector} from "../../redux/hooks";
import {coreStateSelector} from "../../redux/slicer";

import {MainMenu} from "./menu";
import {HUDCore} from "./HUD";

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
            <div>
                <HUDCore/>
            </div>
        )
    }
}

export {InterfaceCore};
