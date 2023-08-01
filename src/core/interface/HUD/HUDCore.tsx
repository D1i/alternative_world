import {useAppSelector} from "../../../redux/hooks";
import {coreStateSelector} from "../../../redux/slicer";

import {Inventory} from "./inventory";
import {useMemo} from "react";

function HUDCore(): JSX.Element {
    const selectedCoreStateSelector = useAppSelector(coreStateSelector);

    const inventorys = useMemo(() => {
        return (
            <div>
                {selectedCoreStateSelector.interface.HUD.inventory.map((bag) => <Inventory
                    key={bag.code}
                    bag={bag}
                    width={500}
                    height={500}
                />)}
            </div>
        )
    }, [selectedCoreStateSelector.interface.HUD.inventory])
    return (
        <div>
            {inventorys}
        </div>
    )
}

export {HUDCore};
