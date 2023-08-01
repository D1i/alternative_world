import {CSSProperties, MouseEvent, MouseEventHandler, useCallback, useMemo, useRef, useState} from "react";
import {cloneDeep, isEqual} from "lodash";

import {utils} from './utils';

// @ts-ignore
import wood from './wood.png';
// @ts-ignore
import cellBackground from './inventory-cell.png';

import {Bag} from "../../../types/interfaceCore";

import s from './style.module.scss';

type Props = {
    bag: Bag,
    width: number,
    height: number
}

function BagUnit({bag, width, height}: Props) {
    const [inner, setInner] = useState(cloneDeep(bag.inner));
    const [currentBufferedItem, setCurrentBufferedItem] = useState(null);
    const [relativeShiftPoint, setRelativeShiftPoint] = useState(null);
    // const [itemTargetCell, setItemTargetCell] = useState(null);
    const [spectatorCloneItem, setSpectatorCloneItem] = useState(null);

    const cellWidth = useMemo(() => width / bag.x, [width, bag.x]);
    const cellHeight = useMemo(() => height / bag.y, [height, bag.y]);

    const container = useRef();
    const spectatorCloneItemElement = useRef();

    const styles: CSSProperties = useMemo(() => {
        return ({
            width: `${width}px`,
            height: `${height}px`,
            position: 'relative',
            backgroundImage: `url("${cellBackground}")`,
            backgroundSize: `${cellWidth}px`,
        })
    }, [width, height, cellWidth]);

    const items = useMemo(() => inner.map((item) => {
        const cellStyles: CSSProperties = {
            position: 'absolute',
            left: `${cellWidth * item.x}px`,
            top: `${cellHeight * item.y}px`,
            width: `${cellWidth * item.width}px`,
            height: `${cellHeight * item.height}px`,
            cursor: 'pointer',
            backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
        }
        return (
            <div
                key={`item-${item.id}-${item.x}-${item.y}`}
                style={cellStyles}
            >
                {item.name}
            </div>
        )
    }), [inner, cellWidth, cellHeight]);

    const handleMouseDown = useCallback((event: MouseEvent<HTMLDivElement>): void => {
        if (!container?.current) {
            return;
        }
        const x = event["pageX"] - container.current["offsetLeft"];
        const y = event["pageY"] - container.current["offsetTop"];
        const position = utils.getCellPosition(cellWidth, cellHeight, x, y);
        const target = utils.checkItemOnPosition(inner, position?.x, position?.y);
        setRelativeShiftPoint({
            x: position?.x - target?.item?.x, y: position?.y - target?.item?.y,
        })

        setCurrentBufferedItem(target.item);
    }, [cellWidth, cellHeight, inner]);

    const handleMouseUp = useCallback((event: MouseEvent<HTMLDivElement>): void => {
        if (!container?.current || !relativeShiftPoint) {
            return;
        }
        const x = event["pageX"] - container.current["offsetLeft"];
        const y = event["pageY"] - container.current["offsetTop"];
        const position = utils.getCellPosition(cellWidth, cellHeight, x, y);
        const xPosition = position.x - relativeShiftPoint.x;
        const yPosition = position.y - relativeShiftPoint.y;
        if (currentBufferedItem !== null && !utils.collisionBetweenItems(inner, {
            ...currentBufferedItem, x: xPosition, y: yPosition
        }) && !utils.collisionOutlineBag(bag.x, bag.y, {
            ...currentBufferedItem, x: xPosition, y: yPosition
        })) {
            const newInner = inner.map(item => {
                if (isEqual(item, currentBufferedItem)) {
                    return ({
                        ...item, x: xPosition, y: yPosition
                    });
                }

                return item;
            })

            setInner(newInner);

            setCurrentBufferedItem(null);
            setSpectatorCloneItem(null);
        }
    }, [relativeShiftPoint, cellWidth, cellHeight, currentBufferedItem, inner, bag.x, bag.y]);

    const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>): void => {
        if (!currentBufferedItem || !currentBufferedItem || !relativeShiftPoint) {
            return;
        }
        if (spectatorCloneItem) {
            if (!container?.current) {
                return;
            }
            const x = event["pageX"] - container.current["offsetLeft"];
            const y = event["pageY"] - container.current["offsetTop"];
            console.log(spectatorCloneItemElement?.current)
            if (!spectatorCloneItemElement) {
                return;
            }
            // @ts-ignore
            spectatorCloneItemElement.current.style.left = `${x - relativeShiftPoint.x * cellWidth}px`;
            // @ts-ignore
            spectatorCloneItemElement.current.style.top = `${y - relativeShiftPoint.y * cellWidth}px`;
        } else {
            const cellStyles: CSSProperties = {
                position: 'absolute',
                left: `${cellWidth * currentBufferedItem.x}px`,
                top: `${cellHeight * currentBufferedItem.y}px`,
                width: `${cellWidth * currentBufferedItem.width}px`,
                height: `${cellHeight * currentBufferedItem.height}px`,
                cursor: 'pointer',
                backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
                zIndex: 1,
                opacity: 0.5,
            }
            setSpectatorCloneItem(
                <div
                    ref={spectatorCloneItemElement}
                    key={`item-${currentBufferedItem.id}-${currentBufferedItem.x}-${currentBufferedItem.y}`}
                    style={cellStyles}>
                    {currentBufferedItem.name}
                </div>
            )
        }

    }, [currentBufferedItem, relativeShiftPoint, spectatorCloneItem, cellWidth, cellHeight]);

    return (<div
        style={styles}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={container}
    >
        {spectatorCloneItem}
        {items}
    </div>)
}


function Inventory({bag, width, height}: Props): JSX.Element {
    return (
        <div
            className={s.container}
            style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <BagUnit bag={bag} width={width} height={height}/>
        </div>)
}



export {Inventory}
