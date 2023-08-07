import { useCallback, useMemo, useState } from 'react';

import { HUDTypes } from 'src/types';
import { AdminPanel } from './admin-panel';
import { HUDWindow } from './window';
import { Bag } from './bag';
import { setBufferItem } from '../../../redux/HUDReducer';
import { Types } from 'src/types/HUD';
import { HUDInfo } from './dev-HUDS';
import { PSEUDO_DATA } from '../../../API/pseudo-data';

enum Mode {
    NONE = 'NONE',
    ITEM_MOVE = 'ITEM_MOVE',
    SHIFTING_WINDOW = 'SHIFTING_WINDOW',
}

// type PropsType = {
//     HUDs:
// }

type ObjectWithCode = {
    code: number;
};

function isEqualCodes(
    employA: ObjectWithCode,
    employB: ObjectWithCode
): boolean {
    return employA.code === employB.code;
}

function HUDLayout(props: { HUDS: Array<HUDTypes.HUD> }) {
    const [HUDSLocal, setHUDLocal] = useState(props.HUDS);
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

    const handleAddBufferItem = useCallback(
        (code: number) => {
            let item = null;
            props.HUDS.forEach((p) => {
                if ('inner' in p.specialData && !item) {
                    item = p.specialData?.inner.find((item) => {
                        return item.code === code;
                    });
                }
            });
            setBufferItem(item);
            setItemBuffer(item);
        },
        [props.HUDS]
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
        (importHUD) => {
            return (position: { cellX: number; cellY: number }) => {
                if (!itemBuffer) {
                    return;
                }

                const exportHUD = HUDSLocal.find((HUDI) => {
                    if (
                        isEqualCodes(HUDI, importHUD) ||
                        HUDI?.type !== Types.BAG
                    ) {
                        return;
                    }
                    // @ts-ignore
                    return HUDI.specialData.inner.find((item) =>
                        isEqualCodes(item, itemBuffer)
                    );
                });

                const prevHUDS = HUDSLocal.filter(
                    (HUDI) =>
                        !isEqualCodes(HUDI, importHUD) &&
                        !isEqualCodes(HUDI, exportHUD || { code: null })
                );

                itemBuffer.x = position.cellX;
                itemBuffer.y = position.cellY;

                if (exportHUD && exportHUD?.type === 'BAG') {
                    // @ts-ignore
                    exportHUD.specialData.inner =
                        // @ts-ignore
                        exportHUD.specialData.inner.filter((item) =>
                            !isEqualCodes(item, itemBuffer)
                        );
                }

                if (importHUD && importHUD?.type === 'BAG') {
                    // @ts-ignore
                    importHUD.specialData.inner =
                        // @ts-ignore
                        importHUD.specialData.inner.filter((item) =>
                            !isEqualCodes(item, itemBuffer)
                        );
                }

                // @ts-ignore
                importHUD.specialData.inner.push(itemBuffer);
                if (
                    exportHUD &&
                    !isEqualCodes(exportHUD || { code: null }, importHUD)
                ) {
                    setHUDLocal([...prevHUDS, exportHUD, importHUD]);
                } else {
                    setHUDLocal([...prevHUDS, importHUD]);
                }
            };
        },
        [HUDSLocal, itemBuffer]
    );

    const generateHandlePinSet = useCallback(
        (HUD) => {
            // TODO Переписать на redux + sync
            return (pinPosition) => {
                if (!pinPosition) {
                    return;
                }
                const prevHUDS = HUDSLocal.filter(
                    (HUDI) => !isEqualCodes(HUDI, HUD)
                );
                HUD.startX = pinPosition.x;
                HUD.startY = pinPosition.y;
                setHUDLocal([...prevHUDS, HUD]);
            };
        },
        [HUDSLocal, shiftingMouseOnHUD]
    );

    const HUDSElements = useMemo(() => {
        return HUDSLocal.map((HUD: HUDTypes.HUD) => {
            if (HUD.type === HUDTypes.Types.ADMIN_PANEL) {
                return <AdminPanel key={HUD.code} />;
            } else if (HUD.type === HUDTypes.Types.DEV_INFO) {
                // return <HUDInfo position={{ x: 0, y: 0 }} />;
            } else if (HUD.type === HUDTypes.Types.BAG) {
                const handlePinSet = generateHandlePinSet(HUD);

                const handleItemDrop = generateHandleItemDrop(HUD);

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
                            addBufferItem={handleAddBufferItem}
                            handleItemDrop={handleItemDrop}
                        />
                    </HUDWindow>
                );
            }
        });
    }, [HUDSLocal, generateHandleItemDrop]);

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
