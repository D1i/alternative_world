import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeBag, coreStateSelector} from "../../../redux/slicer";

import {Inventory} from "./inventory";
import {useMemo} from "react";
import {Bags} from "./bags";
import {ShiftContainer} from "./shift-container";
import {playSound} from "../../audio";

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
    return (
        <div>
            <Bags/>
            {inventorys}
        </div>
    )
}

export {HUDCore};
