import { CellForItems } from '../cell-for-items';
import { useCallback, useRef } from 'react';
import { CELL_SIZE } from 'src/constants';

function Bag(props) {
    const container = useRef();

    const handleItemDrop = useCallback(
        (event) => {
            const position = { cellX: null, cellY: null };
            position.cellX = Math.ceil(
                (event['pageX'] -
                    // @ts-ignore
                    container?.current?.getBoundingClientRect().x) / CELL_SIZE
            ) - 1;
            position.cellY = Math.ceil(
                (event['pageY'] -
                    // @ts-ignore
                    container?.current?.getBoundingClientRect().y) / CELL_SIZE
            ) - 1;
            props.handleItemDrop(position);
            // @ts-ignore
        },
        [container, props.handleItemDrop]
    );

    return (
        <div ref={container} onMouseUp={handleItemDrop}>
            <CellForItems
                addBufferItem={props.addBufferItem}
                data={props.data}
            />
        </div>
    );
}

export { Bag };
