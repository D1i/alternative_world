import { CSSProperties, useCallback, useMemo } from 'react';
import { CELL_SIZE } from '../../../../../constants';
import * as url from 'url';
import { getItemSource, getTexture } from './items-store/items-store';

function Item(props: {
    position: { x: number; y: number };
    id: number;
    code: number;
    handleItemSelect: (code: number) => void;
}) {
    const handleMouseDown = useCallback(() => {
        props.handleItemSelect(props.code);
    }, []);

    const style: CSSProperties = useMemo(() => {
        const itemSource = getItemSource(props.id);
        return {
            position: 'absolute',
            left: `${props.position.x * CELL_SIZE}px`,
            top: `${props.position.y * CELL_SIZE}px`,
            width: `${itemSource.width * CELL_SIZE}px`,
            height: `${itemSource.height * CELL_SIZE}px`,
            cursor: 'pointer',
            backgroundSize: 'cover',
            backgroundImage: `url("${getTexture(props.id)}")`,
            userSelect: 'none',
        };
    }, [props.position, props.id, CELL_SIZE]);

    return <div style={style} onMouseDown={handleMouseDown}></div>;
}

export { Item };
