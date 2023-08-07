import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';

import { HUDItem } from './item';

import { ItemExemplar } from 'src/types/HUD';

import { CELL_SIZE } from 'src/constants';

// @ts-ignore
import cellBackground from './inventory-cell.png';
import { getTexture } from './item/items-store/items-store';

type PropsType = {
    data: {
        inner: Array<ItemExemplar>;
        code: number;
        x: number;
        y: number;
    };
    type?: string;
    addBufferItem: (code: number) => void;
    currentSelectedItem: ItemExemplar;
};

function CellForItems(props: PropsType) {
    const [cellPositionMouse, setCellPositionMouse] = useState({ x: 0, y: 0 });

    const container = useRef();

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
                y:
                    Math.ceil(
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
        return {
            width: `${CELL_SIZE * props.data.x}px`,
            height: `${CELL_SIZE * props.data.y}px`,
            position: 'relative',
            backgroundImage: `url("${cellBackground}")`,
            backgroundSize: `${CELL_SIZE}px`,
        };
    }, [props.data.x, props.data.y]);

    const content = useMemo(() => {
        return props.data.inner.map((item) => {
            return (
                <HUDItem
                    key={item.code}
                    position={{ x: item.x, y: item.y }}
                    code={item.code}
                    handleItemSelect={props.addBufferItem}
                    id={item.id}
                />
            );
        });
    }, [props]);

    const spectatorStyles: CSSProperties = useMemo(() => {
        if (
            props.currentSelectedItem &&
            props.data.inner.find(
                (item) => item.code === props.currentSelectedItem.code
            )
        ) {
            return {
                display: props.currentSelectedItem ? 'block' : 'none',
                position: 'absolute',
                left: `${cellPositionMouse.x * CELL_SIZE}px`,
                top: `${cellPositionMouse.y * CELL_SIZE}px`,
                width: `${props.currentSelectedItem.width * CELL_SIZE}px`,
                height: `${props.currentSelectedItem.height * CELL_SIZE}px`,
                background: `url("${getTexture(
                    props?.currentSelectedItem.id || 0
                )}")`,
                backgroundSize: 'cover',
                opacity: 0.5,
            };
        } else {
            return {
                display: 'none',
            };
        }
    }, [cellPositionMouse, props.currentSelectedItem]);

    return (
        <div
            ref={container}
            onMouseMove={handleMouseMove}
            key={props.data.code}
            style={style}
        >
            <div style={spectatorStyles}>TSAESAEA</div>
            {content}
        </div>
    );
}

export { CellForItems };
