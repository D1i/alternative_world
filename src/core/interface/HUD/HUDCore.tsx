import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeBag, coreStateSelector} from "../../../redux/HUDReducer";

import {Inventory} from "./inventory";
import {useMemo} from "react";
import {Bags} from "./bags";
import {ShiftContainer} from "./shift-container";
import {playSound} from "../../audio";
import {HUDLayout} from "./HUDLayout";
import {HUDBuilder} from "./HUD-utils";
import {AdminPanel, Bag, Profile, Size, Types} from "../../../types/HUD";
import {codeGenerator} from "../../../utils/code-generator";
import {HUDTypes} from "../../../types";
import {DATA} from "../../../API";

const PSEUDO_DATA = {
    id: 0,
    code: codeGenerator(),
    type: HUDTypes.Types.ADMIN_PANEL,
    hasShifting: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    zIndex: 0,
    specialData: {},
    size: {width: 100, height: 100},
}

function HUDCore(): JSX.Element {
    const selectedCoreStateSelector = useAppSelector(coreStateSelector);
    const dispatch = useAppDispatch();

    const inventorys = useMemo(() => {
        return (
            <div>
                {selectedCoreStateSelector.interface.HUD.openedBags.map((bag) => {
                    function handleClose() {
                        dispatch(closeBag(bag));
                        playSound(2);
                    }

                    return (
                        <ShiftContainer key={bag.code} handleClose={handleClose}>
                            <Inventory
                                bag={bag}
                                width={bag.x * 50}
                                height={bag.y * 50}
                            />
                        </ShiftContainer>)

                })}
            </div>
        )
    }, [selectedCoreStateSelector.interface.HUD.openedBags, dispatch])

    const HUDS: Array<HUDTypes.HUD> = useMemo(() => {
        return DATA.map(HUD => new HUDBuilder(HUD).calculatedCoordinates());
    }, []);
    return (
        <div>
            <HUDLayout HUDS={HUDS}/>
            {/*<Bags/>*/}
            {/*{inventorys}*/}
        </div>
    )
}

export {HUDCore};
