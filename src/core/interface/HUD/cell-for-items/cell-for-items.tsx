import { CSSProperties, useMemo } from 'react';

import { HUDItem } from './item';

import { ItemExemplar } from 'src/types/HUD';

import { CELL_SIZE } from 'src/constants';

// @ts-ignore
import cellBackground from './inventory-cell.png';

type PropsType = {
    data: {
        inner: Array<ItemExemplar>;
        code: number;
        x: number;
        y: number;
    };
    type?: string;
    addBufferItem: (code: number) => void;
};

function CellForItems(props: PropsType) {
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
        return props.data.inner.map((item) => (
            <HUDItem
                position={{ x: item.x, y: item.y }}
                code={item.code}
                handleItemSelect={props.addBufferItem}
                id={item.id}
            />
        ));
    }, [props]);

    return <div style={style}>{content}</div>;
}

export { CellForItems };
