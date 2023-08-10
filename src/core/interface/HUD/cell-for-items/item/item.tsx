import { CSSProperties, useCallback, useMemo } from 'react';
import { CELL_SIZE } from '../../../../../constants';
import { getItemSource, getTexture } from './items-store/items-store';

function Item(props: {
    position: {
        x: number;
        y: number;
    };
    id: number;
    code: number;
    handleItemSelect: (code: number) => void;
    miniature?: boolean;
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
            width: `${
                props.miniature ? CELL_SIZE : itemSource.width * CELL_SIZE
            }px`,
            height: `${
                props.miniature ? CELL_SIZE : itemSource.height * CELL_SIZE
            }px`,
            cursor: 'pointer',
            backgroundSize: 'cover',
            backgroundImage: `url("${getTexture(props.id)}")`,
            userSelect: 'none',
        };
    }, [props.position, props.id, CELL_SIZE, props.miniature]);

    return <div style={style} onMouseDown={handleMouseDown}></div>;
}

export { Item };
