import { useCallback, useMemo, useState } from 'react';

import { HUDTypes } from 'src/types';
import { AdminPanel } from './admin-panel';
import { HUDWindow } from './window';
import { Bag } from './bag';
import { HUD, ItemExemplar, Types } from 'src/types/HUD';
import { HUDInfo } from './dev-HUDS';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
    coreStateSelector,
    editBag,
    setImportHUD,
    setItemBuffer,
} from '../../../redux/HUDReducer';
import { BagClass } from '../../../utils/bag-generator/bag-generator';
import { PlayerSlots } from './player-slots';
import { Foundry } from './craft';

enum Mode {
    NONE = 'NONE',
    ITEM_MOVE = 'ITEM_MOVE',
    SHIFTING_WINDOW = 'SHIFTING_WINDOW',
}

type ObjectWithCode = {
    code: number;
};

function isEqualCodes(
    employA: ObjectWithCode,
    employB: ObjectWithCode
): boolean {
    return employA.code === employB.code;
}

function HUDLayout() {
    const selectedCoreStateSelector = useAppSelector(coreStateSelector);

    const itemBuffer = useMemo(
        () => selectedCoreStateSelector.interface.HUDDdata.itemBuffer,
        [selectedCoreStateSelector.interface.HUDDdata.itemBuffer]
    );

    const importHUD = useMemo(
        () => selectedCoreStateSelector.interface.HUDDdata.importHUD,
        [selectedCoreStateSelector.interface.HUDDdata.importHUD]
    );

    const HUDs = useMemo(
        () => selectedCoreStateSelector.interface.HUDs,
        [selectedCoreStateSelector]
    );

    const dispatch = useAppDispatch();


    const [mousePosition, setMousePosition] = useState<{
        x: number;
        y: number;
    }>({ x: 0, y: 0 });
    const [mouseIsDown, setMouseIsDown] = useState<boolean>(false);
    const [currentShiftingHUD, setCurrentShiftingHUD] = useState(null);
    const [shiftingMouseOnHUD, setShiftingMouseOnHUD] = useState(null);

    useState<null | JSX.Element>(null);

    const handleSetShiftingHUD = useCallback((ref, shifting) => {
        setCurrentShiftingHUD(ref);
        setShiftingMouseOnHUD(shifting);
        setMouseIsDown(true);
        ref.current.style.zIndex = 1;
    }, []);

    const handleMouseMove = useCallback(
        (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
            if (mouseIsDown && currentShiftingHUD) {
                currentShiftingHUD.current.style.left = `${
                    event.clientX - shiftingMouseOnHUD.x
                }px`;
                currentShiftingHUD.current.style.top = `${
                    event.clientY - shiftingMouseOnHUD.y
                }px`;
                currentShiftingHUD.current.style.zIndex = 1;
            }
        },
        [mouseIsDown, currentShiftingHUD, shiftingMouseOnHUD]
    );

    const handleMouseUp = useCallback(() => {
        if (currentShiftingHUD?.current) {
            currentShiftingHUD.current.style.zIndex = 0;
        }
        setCurrentShiftingHUD(null);
        setShiftingMouseOnHUD(null);
        setMouseIsDown(false);
        dispatch(setItemBuffer(null));
        // setItemBuffer(null);
    }, [currentShiftingHUD]);

    const generateHandlePinSet = useCallback(
        (HUD: HUD) => {
            // TODO Переписать на redux + sync
            return (pinPosition) => {
                if (!pinPosition) {
                    return;
                }
            };
        },
        [HUDs, shiftingMouseOnHUD]
    );

    const HUDSElements = useMemo(() => {
        return HUDs.map((HUD: HUDTypes.HUD) => {
            if (HUD.type === HUDTypes.Types.ADMIN_PANEL) {
                return <AdminPanel key={HUD.code} />;
            } else if (HUD.type === HUDTypes.Types.FOUNDRY) {
                const handlePinSet = generateHandlePinSet(HUD);
                const pinPosition = { x: HUD.startX, y: HUD.startY };
                return (
                    <HUDWindow
                        startPosition={pinPosition}
                        key={HUD.code}
                        handleShift={handleSetShiftingHUD}
                        handleClose={() => {}}
                        handlePinSet={handlePinSet}
                    >
                        <Foundry
                            data={HUD.specialData}
                        />
                    </HUDWindow>
                );
            } else if (HUD.type === HUDTypes.Types.BAG) {
                const handlePinSet = generateHandlePinSet(HUD);

                const pinPosition = { x: HUD.startX, y: HUD.startY };

                return (
                    <HUDWindow
                        startPosition={pinPosition}
                        key={HUD.code}
                        handleShift={handleSetShiftingHUD}
                        handleClose={() => {}}
                        handlePinSet={handlePinSet}
                    >
                        <Bag
                            data={HUD.specialData}
                        />
                    </HUDWindow>
                );
            }
        });
    }, [HUDs, itemBuffer]);

    return (
        <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            {HUDSElements}
            <HUDInfo
                data={{
                    bufferedItem: itemBuffer,
                    mouseIsDropped: mouseIsDown,
                    currentShiftingHUD: currentShiftingHUD,
                    shiftingMouseOnHUD: currentShiftingHUD,
                }}
                position={mousePosition}
            />

            <PlayerSlots />
        </div>
    );
}

export { HUDLayout };
