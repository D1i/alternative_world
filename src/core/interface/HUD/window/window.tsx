import {
    MouseEventHandler,
    MutableRefObject,
    ReactNode,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';
import s from './style.module.scss';

type PropsType = {
    children: Array<ReactNode> | ReactNode;
    startPosition?: { x: number; y: number };
    handleShift: (ref, shifting: { x: number; y: number }) => void;
    handleClose: () => void;
    handlePinSet?: (pinPosition: { x: number; y: number }) => void;
};

function Window(props: PropsType) {
    const container: MutableRefObject<ReactNode> = useRef();

    const handleMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            const x = event['pageX'] - container.current['offsetLeft'];
            const y = event['pageY'] - container.current['offsetTop'];
            props.handleShift(container, { x: x, y: y });
        },
        []
    );

    const isPinned = useMemo(() => {
        return props?.startPosition?.x || props?.startPosition?.y;
    }, [props?.startPosition]);

    const handlePinSet = useCallback(() => {
        if (isPinned) {
            props.handlePinSet({ x: 0, y: 0 });
            return;
        }

        props.handlePinSet({
            // @ts-ignore
            x: container?.current?.getBoundingClientRect().left,
            // @ts-ignore
            y: container?.current?.getBoundingClientRect().top,
        });
    }, [container, props?.handlePinSet, isPinned]);

    const style = useMemo(() => {
        return { color: isPinned ? 'red' : 'white' };
    }, [isPinned]);

    return (
        <div
            // @ts-ignore
            ref={container}
            className={s.container}
        >
            <div className={s.header} onMouseDown={handleMouseDown}>
                <div
                    style={style}
                    className={s.closeBtn}
                    onClick={handlePinSet}
                >
                    PIN
                </div>
                <div className={s.closeBtn} onClick={props.handleClose}>
                    X
                </div>
            </div>
            {props.children}
        </div>
    );
}

export { Window };
