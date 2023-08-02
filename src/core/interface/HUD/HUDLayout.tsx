import {Ref, useCallback, useEffect, useMemo, useState} from "react";

import {HUDTypes} from "src/types";
import {AdminPanel} from "./admin-panel";

enum Mode {
    NONE = 'NONE',
    ITEM_MOVE = 'ITEM_MOVE',
    SHIFTING_WINDOW = 'SHIFTING_WINDOW',
}

// type PropsType = {
//     HUDs:
// }

function HUDLayout(props: { HUDS: Array<HUDTypes.HUD> }) {
    const [mode, setMode] = useState<Mode>(Mode.NONE);

    const [itemBuffer, setItemBuffer] = useState<null | HUDTypes.ItemExemplar>(null);
    const [itemBufferedElement, setItemBufferedElement] = useState<null | JSX.Element>(null);

    const [currentShiftingHUD, setCurrentShiftingHUD] = useState<null | Ref<JSX.Element>>(null);

    const HUDSElements = useMemo(() => {
        return props.HUDS.map((HUD: HUDTypes.HUD) => {
                if (HUD.type === HUDTypes.Types.ADMIN_PANEL) {
                    return (<AdminPanel/>);
                } else if (HUD.type === HUDTypes.Types.BAG_LIST) {
                    return 'BAG_LIST';
                } else if (HUD.type === HUDTypes.Types.BAG) {
                    return 'BAG';
                }
            }
        )
    }, []);

    const handleAddBufferItem = useCallback(() => {
    }, []);
    const handleRemoveBufferItem = useCallback(() => {
    }, []);

    const handleSetShiftingHUD = useCallback((ref: Ref<JSX.Element>) => {
        setCurrentShiftingHUD(ref);
    }, [])

    return (
        <div>
            {HUDSElements}
        </div>
    )
}

export {HUDLayout};
