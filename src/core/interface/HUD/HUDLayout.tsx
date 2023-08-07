import { useCallback, useMemo, useState } from 'react';

import { HUDTypes } from 'src/types';
import { AdminPanel } from './admin-panel';
import { HUDWindow } from './window';
import { Bag } from './bag';
import { HUD, ItemExemplar, Types } from 'src/types/HUD';
import { HUDInfo } from './dev-HUDS';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { coreStateSelector, editBag } from '../../../redux/HUDReducer';
import { BagClass } from '../../../utils/bag-generator/bag-generator';

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

    const HUDs = useMemo(
        () => selectedCoreStateSelector.interface.HUDs,
        [selectedCoreStateSelector]
    );

    const dispatch = useAppDispatch();

    const [HUDSLocal, setHUDLocal] = useState(HUDs);
    // const [mode, setMode] = useState<Mode>(Mode.NONE);

    const [mousePosition, setMousePosition] = useState<{
        x: number;
        y: number;
    }>({ x: 0, y: 0 });
    const [mouseIsDown, setMouseIsDown] = useState<boolean>(false);
    const [currentShiftingHUD, setCurrentShiftingHUD] = useState(null);
    const [shiftingMouseOnHUD, setShiftingMouseOnHUD] = useState(null);
    const [itemBuffer, setItemBuffer] = useState<null | HUDTypes.ItemExemplar>(
        null
    );
    const [itemBufferedElement, setItemBufferedElement] =
        useState<null | JSX.Element>(null);
    const [sourceHUD, setSourceHUD] = useState(null);

    const handleAddBufferItem = useCallback(
        (code: number) => {
            let item = null;
            HUDs.forEach((p) => {
                if ('inner' in p.specialData && !item) {
                    item = p.specialData?.inner.find((item) => {
                        return item.code === code;
                    });
                }
            });
            setItemBuffer(item);
        },
        [HUDs]
    );

    const handleRemoveBufferItem = useCallback(() => {}, []);

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

    const generateHandleSetSourceBag = useCallback((HUD) => {
        return () => {
            setSourceHUD(HUD);
        };
    }, []);

    const handleMouseUp = useCallback(() => {
        if (currentShiftingHUD?.current) {
            currentShiftingHUD.current.style.zIndex = 0;
        }
        setCurrentShiftingHUD(null);
        setShiftingMouseOnHUD(null);
        setMouseIsDown(false);
        setItemBuffer(null);
    }, [currentShiftingHUD]);

    const generateHandleItemDrop = useCallback(
        (droppedHUD) => {
            return (position: { cellX: number; cellY: number }) => {
                if (!itemBuffer) {
                    return;
                }

                function getExportHUD(HUDs: Array<HUD>, importHUD: HUD) {
                    if (isEqualCodes(sourceHUD, droppedHUD)) {
                        return;
                    }

                    return droppedHUD;
                }

                function getImportHUD(HUDs: Array<HUD>) {
                    if (sourceHUD?.type !== HUDTypes.Types.BAG) {
                        return;
                    }

                    return sourceHUD;
                }

                function getInnerWithoutItem(HUD) {
                    if (HUD.type !== HUDTypes.Types.BAG) {
                        return;
                    }
                    return HUD.specialData.inner.filter(
                        (item: ItemExemplar) => !isEqualCodes(item, itemBuffer)
                    );
                }

                function dropItemInThisBag(bag) {
                    // itemBuffer.x = position.cellX;
                    // itemBuffer.y = position.cellY;
                    const wrapperBag = new BagClass({
                        width: bag.specialData.inner.x,
                        height: bag.specialData.inner.y,
                    });

                    wrapperBag.setWrapper(bag.specialData);

                    wrapperBag.itemPut({
                        ...itemBuffer,
                        x: position.cellX,
                        y: position.cellY,
                    });

                    dispatch(editBag(wrapperBag.getSerializableObject()));
                }

                function dropItemInOtherBag(currentBag, targetBag) {
                    if (
                        currentBag.type !== HUDTypes.Types.BAG ||
                        targetBag.type !== HUDTypes.Types.BAG
                    ) {
                        return;
                    }

                    const wrappedCurrentBag = new BagClass({
                        width: currentBag.specialData.inner.x,
                        height: currentBag.specialData.inner.y,
                    });

                    const wrappedTargetBag = new BagClass({
                        width: targetBag.specialData.inner.x,
                        height: targetBag.specialData.inner.y,
                    });

                    wrappedCurrentBag.setWrapper(currentBag.specialData);
                    wrappedTargetBag.setWrapper(targetBag.specialData);
                    wrappedCurrentBag.itemShiftOnOtherBag(
                        {
                            ...itemBuffer,
                            x: position.cellX,
                            y: position.cellY,
                        },
                        wrappedTargetBag
                    );

                    dispatch(
                        editBag(wrappedCurrentBag.getSerializableObject())
                    );

                    dispatch(editBag(wrappedTargetBag.getSerializableObject()));
                }

                const importHUD = getImportHUD(HUDs);

                const exportHUD = getExportHUD(HUDs, importHUD);
                if (!exportHUD) {
                    dropItemInThisBag(importHUD);
                } else {
                    dropItemInOtherBag(importHUD, exportHUD);
                }
            };
        },
        [HUDs, itemBuffer]
    );

    const generateHandlePinSet = useCallback(
        (HUD) => {
            // TODO Переписать на redux + sync
            return (pinPosition) => {
                if (!pinPosition) {
                    return;
                }
                const prevHUDS = HUDs.filter(
                    (HUDI) => !isEqualCodes(HUDI, HUD)
                );
                HUD.startX = pinPosition.x;
                HUD.startY = pinPosition.y;
                setHUDLocal([...prevHUDS, HUD]);
            };
        },
        [HUDs, shiftingMouseOnHUD]
    );

    const HUDSElements = useMemo(() => {
        return HUDs.map((HUD: HUDTypes.HUD) => {
            if (HUD.type === HUDTypes.Types.ADMIN_PANEL) {
                return <AdminPanel key={HUD.code} />;
            } else if (HUD.type === HUDTypes.Types.DEV_INFO) {
                // return <HUDInfo position={{ x: 0, y: 0 }} />;
            } else if (HUD.type === HUDTypes.Types.BAG) {
                const handlePinSet = generateHandlePinSet(HUD);

                const handleItemDrop = generateHandleItemDrop(HUD);

                const pinPosition = { x: HUD.startX, y: HUD.startY };

                const handleSetSourceBag = generateHandleSetSourceBag(HUD);

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
                            setSourceBag={handleSetSourceBag}
                            addBufferItem={handleAddBufferItem}
                            handleItemDrop={handleItemDrop}
                            currentSelectedItem={itemBuffer}
                        />
                    </HUDWindow>
                );
            }
        });
    }, [HUDs, generateHandleItemDrop, itemBuffer]);

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
        </div>
    );
}

export { HUDLayout };
