import { CSSProperties, useMemo } from 'react';

function HUDInfo(props: {
    position: { x: number; y: number };
    data: {
        bufferedItem: any;
        mouseIsDropped: any;
        currentShiftingHUD: any;
        shiftingMouseOnHUD: any;
    };
}) {
    const style: CSSProperties = useMemo(() => {
        return {
            left: `${props.position.x - 20}px`,
            top: `${props.position.y + 20}px`,
            position: 'absolute',
            zIndex: 10,
            width: '200px',
            userSelect: 'none',
        };
    }, [props.position]);

    const bufferedItem = useMemo(() => {
        if (props.data.bufferedItem) {
            return (
                <div>
                    <h3>Выбранный предмет</h3>
                    <div>
                        <b>ID: </b>
                        {props.data.bufferedItem.id}
                    </div>
                    <div>
                        <b>NAME: </b>
                        {props.data.bufferedItem.name}
                    </div>
                    <div>
                        <b>CODE: </b>
                        {props.data.bufferedItem.code}
                    </div>
                </div>
            );
        }
        return 'NONE';
    }, [props.data.bufferedItem]);

    return (
        <div style={style}>
            {bufferedItem}
        </div>
    );
}

export { HUDInfo };
