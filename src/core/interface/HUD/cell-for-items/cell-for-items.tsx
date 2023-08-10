import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

import { HUDItem } from './item';

import { Bag } from 'src/types/HUD';
import { HUDTypes } from 'src/types';

import { CELL_SIZE } from 'src/constants';

// @ts-ignore
import cellBackground from './inventory-cell.png';
import { getTexture } from './item/items-store/items-store';
import {
    coreStateSelector,
    setExportHUD,
    setImportHUD,
    setItemBuffer,
    setItemBufferExportHudTargetSpecific,
} from 'src/redux/HUDReducer';

import utils from 'src/utils';

type PropsType = {
    data: Bag;
    type?: string;
    infinityCell?: boolean;
    target?: string;
};

type ObjectWithCode = {
    code: number;
};

function isEqualCodes(
    employA: ObjectWithCode,
    employB: ObjectWithCode
): boolean {
    return employA.code === employB.code;
}

function CellForItems(props: PropsType) {
    const dispatch = useAppDispatch();
    const selectedCoreStateSelector = useAppSelector(coreStateSelector);

    const itemBuffer = useMemo(
        () => selectedCoreStateSelector.interface.HUDDdata.itemBuffer,
        [selectedCoreStateSelector.interface.HUDDdata.itemBuffer]
    );

    const exportHUD = useMemo(
        () => selectedCoreStateSelector.interface.HUDDdata.exportHUD,
        [selectedCoreStateSelector.interface.HUDDdata.exportHUD]
    );

    const specialTargetDate = useMemo(
        () =>
            selectedCoreStateSelector.interface.HUDDdata
                .itemBufferExportHudTargetSpecific,
        [
            selectedCoreStateSelector.interface.HUDDdata
                .itemBufferExportHudTargetSpecific,
        ]
    );

    const findHUDParrentBag = useCallback(
        (bag) => {
            return selectedCoreStateSelector.interface.HUDs.find((HUD) =>
                isEqualCodes(HUD.specialData, props.data)
            );
        },
        [selectedCoreStateSelector.interface.HUDs, props.data]
    );

    const [cellPositionMouse, setCellPositionMouse] = useState({ x: 0, y: 0 });

    const container = useRef();

    const handleSetImportHUD = useCallback(() => {
        dispatch(setExportHUD(findHUDParrentBag(props.data)));
        dispatch(setItemBufferExportHudTargetSpecific(props.target));
    }, [props.data, dispatch, setImportHUD, findHUDParrentBag]);

    const handleItemDropMatrixCell = useCallback(
        (position: { cellX: number; cellY: number }) => {
            if (!itemBuffer) {
                return;
            }
            let result: boolean = false;

            const target = props.target ? props.target : specialTargetDate;

            const importHUD = findHUDParrentBag(props.data);

            if (importHUD.type === HUDTypes.Types.BAG) {
                //
                result = utils.itemizationWorker.In.Bag({
                    importHUD,
                    item: itemBuffer,
                    position,
                    dispatch,
                });
            } else if (importHUD.type === HUDTypes.Types.FOUNDRY) {
                result = utils.itemizationWorker.In.Foundry({
                    importHUD,
                    item: itemBuffer,
                    target,
                    dispatch,
                });
            }

            if (!result) {
                return;
            }

            if (exportHUD.type === HUDTypes.Types.BAG) {
                utils.itemizationWorker.From.Bag({
                    exportHUD: exportHUD,
                    item: itemBuffer,
                    dispatch,
                });
            } else if (exportHUD.type === HUDTypes.Types.FOUNDRY) {
                //
                utils.itemizationWorker.From.Foundry({
                    exportHUD: exportHUD,
                    item: itemBuffer,
                    target,
                    dispatch,
                });
            }
        },
        [itemBuffer, exportHUD, props.target, props.data, specialTargetDate]
    );

    const handleItemDrop = useCallback(
        (event) => {
            const position = { cellX: null, cellY: null };
            props.infinityCell ||
                (position.cellX =
                    Math.ceil(
                        (event['pageX'] -
                            // @ts-ignore
                            container?.current?.getBoundingClientRect().x) /
                            CELL_SIZE
                    ) - 1);
            props.infinityCell ||
                (position.cellY =
                    Math.ceil(
                        (event['pageY'] -
                            // @ts-ignore
                            container?.current?.getBoundingClientRect().y) /
                            CELL_SIZE
                    ) - 1);
            handleItemDropMatrixCell(position);

            dispatch(setItemBuffer(null));
            dispatch(setImportHUD(null));
        },
        [container, handleItemDropMatrixCell, props.infinityCell]
    );

    const handleMouseMove = useCallback(
        (event) => {
            if (!container.current) {
                return;
            }
            // @ts-ignore
            const position = container?.current?.getBoundingClientRect();
            setCellPositionMouse({
                x:
                    Math.ceil(
                        (event['pageX'] -
                            // @ts-ignore
                            position.x) /
                            CELL_SIZE
                    ) - 1,
                y: Math.ceil(
                    (event['pageY'] -
                        // @ts-ignore
                        position.y) /
                        CELL_SIZE
                ),
            });
        },
        [container]
    );
    const style: CSSProperties = useMemo(() => {
        if (props.infinityCell) {
            return {
                // @ts-ignore
                width: `${CELL_SIZE}px`,
                // @ts-ignore
                height: `${CELL_SIZE}px`,
                position: 'relative',
                backgroundImage: `url("${cellBackground}")`,
                backgroundSize: `${CELL_SIZE}px`,
            };
        }
        return {
            width: `${CELL_SIZE * props.data.x}px`,
            height: `${CELL_SIZE * props.data.y}px`,
            position: 'relative',
            backgroundImage: `url("${cellBackground}")`,
            backgroundSize: `${CELL_SIZE}px`,
        };
    }, [props.data.x, props.data.y, props.infinityCell]);

    const addBufferItem = useCallback(
        (code) => {
            dispatch(
                setItemBuffer(
                    props?.data?.inner?.find((item) => item.code === code)
                )
            );
        },
        [props?.data?.inner]
    );

    const content = useMemo(() => {
        if (props.infinityCell) {
            if (!props.data[props.target]) {
                return <></>;
            } else {
                return (
                    <HUDItem
                        key={props.data[props.target].code}
                        position={{ x: 0, y: 0 }}
                        code={props.data[props.target].code}
                        handleItemSelect={addBufferItem}
                        id={props.data[props.target].id}
                        miniature={props.infinityCell}
                    />
                );
            }
        }
        return props.data.inner.map((item) => {
            return (
                <HUDItem
                    key={item.code}
                    position={{ x: item.x, y: item.y }}
                    code={item.code}
                    handleItemSelect={addBufferItem}
                    id={item.id}
                    miniature={props.infinityCell}
                />
            );
        });
    }, [props, props.infinityCell]);

    const spectatorStyles: CSSProperties = useMemo(() => {
        if (
            itemBuffer &&
            props.infinityCell &&
            props.data.inner.find((item) => item.code === itemBuffer?.code)
        ) {
            return {
                display: itemBuffer ? 'block' : 'none',
                position: 'absolute',
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                background: `url("${getTexture(itemBuffer.id || 0)}")`,
                backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
                opacity: 0.5,
            };
        }

        if (
            itemBuffer &&
            // @ts-ignore
            props.data.inner.find((item) => item.code === itemBuffer?.code)
        ) {
            return {
                display: itemBuffer ? 'block' : 'none',
                position: 'absolute',
                left: `${cellPositionMouse.x * CELL_SIZE}px`,
                top: `${cellPositionMouse.y * CELL_SIZE}px`,
                width: `${itemBuffer.width * CELL_SIZE}px`,
                height: `${itemBuffer.height * CELL_SIZE}px`,
                background: `url("${getTexture(itemBuffer.id || 0)}")`,
                backgroundSize: 'cover',
                opacity: 0.5,
            };
        } else {
            return {
                display: 'none',
            };
        }
    }, [cellPositionMouse, itemBuffer]);

    return (
        <div
            onMouseDown={handleSetImportHUD}
            ref={container}
            onMouseMove={handleMouseMove}
            key={props.data.code}
            style={style}
            onMouseUp={handleItemDrop}
        >
            <div style={spectatorStyles}></div>
            {content}
        </div>
    );
}

export { CellForItems };
