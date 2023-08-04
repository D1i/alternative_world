import { Ref, useCallback, useMemo, useState } from 'react'

import { HUDTypes } from 'src/types'
import { AdminPanel } from './admin-panel'

enum Mode {
    NONE = 'NONE',
    ITEM_MOVE = 'ITEM_MOVE',
    SHIFTING_WINDOW = 'SHIFTING_WINDOW',
}

// type PropsType = {
//     HUDs:
// }

function HUDLayout(props: { HUDS: Array<HUDTypes.HUD> }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [mode, setMode] = useState<Mode>(Mode.NONE)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [itemBuffer, setItemBuffer] = useState<null | HUDTypes.ItemExemplar>(
        null
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [itemBufferedElement, setItemBufferedElement] =
        useState<null | JSX.Element>(null)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentShiftingHUD, setCurrentShiftingHUD] =
        useState<null | Ref<JSX.Element>>(null)

    const HUDSElements = useMemo(() => {
        return props.HUDS.map((HUD: HUDTypes.HUD) => {
            if (HUD.type === HUDTypes.Types.ADMIN_PANEL) {
                return <AdminPanel />
            } else if (HUD.type === HUDTypes.Types.BAG_LIST) {
                return 'BAG_LIST'
            } else if (HUD.type === HUDTypes.Types.BAG) {
                return 'BAG'
            }
        })
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleAddBufferItem = useCallback(() => {}, [])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleRemoveBufferItem = useCallback(() => {}, [])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSetShiftingHUD = useCallback((ref: Ref<JSX.Element>) => {
        setCurrentShiftingHUD(ref)
    }, [])

    return <div>{HUDSElements}</div>
}

export { HUDLayout }
