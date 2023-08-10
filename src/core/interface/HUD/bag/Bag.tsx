import { CellForItems } from '../cell-for-items';
import { useCallback, useRef } from 'react';
import { CELL_SIZE } from 'src/constants';

// mouseSelectTarget
// currentSelectedItem
function Bag(props) {
    const container = useRef();

    return (
        <div ref={container}>
            <b>{props.data.name}</b>
            <CellForItems
                data={props.data}
            />
        </div>
    );
}

export { Bag };
