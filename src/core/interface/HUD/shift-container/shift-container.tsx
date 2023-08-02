import s from './style.module.scss';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useAppSelector} from "../../../../redux/hooks";
import {coreStateSelector} from "../../../../redux/HUDReducer";

function ShiftContainer(props) {

    const [currentPosition, setCurrentPosition] = useState({x: 0, y: 0});
    const [movementShifting, setMovementShifting] = useState({x: 0, y: 0});
    const [isShifting, setIsShifting] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const container = useRef();

    const stylePosition = useMemo(() => {
        return {
            left: currentPosition.x,
            top: currentPosition.y,
            zIndex: isFocus ? 1 : 0,
        }
    }, [currentPosition.x, currentPosition.y, isFocus])

    const handleMouseDown = useCallback((event) => {
        setIsShifting(true);
        // @ts-ignore
        const x = event.pageX - container.current["offsetLeft"];
        // @ts-ignore
        const y = event.pageY - container.current["offsetTop"];
        setMovementShifting({x: x, y: y});
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsShifting(false);
    }, []);

    const handleMouseMove = useCallback((event) => {
        if (isShifting) {
            setCurrentPosition({x: event.clientX - movementShifting.x, y: event.clientY - movementShifting.y});
        }
    }, [isShifting, movementShifting.x, movementShifting.y]);

    const handleFocus = useCallback(() => {
        setIsFocus(true);
    }, [])

    const handleUnFocus = useCallback(() => {
            setIsFocus(false);
        }, []
    )

    const handleMoiseLeave = useCallback(() => {
        setIsShifting(false);
    }, []);

    return (
        <div
            ref={container}
            className={s.container}
            style={stylePosition}
            onMouseEnter={handleFocus}
            onMouseLeave={handleUnFocus}
        >
            <div
                className={s.header}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMoiseLeave}
            >
                <div className={s.closeBtn} onClick={props?.handleClose}>X</div>
            </div>
            {props.children}
        </div>
    )
}

export {ShiftContainer};
