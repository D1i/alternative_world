import {
    ComponentProps,
    MouseEventHandler,
    MutableRefObject,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react'

import s from './style.module.scss'

function ShiftContainer(props: any): JSX.Element {
    const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })
    const [movementShifting, setMovementShifting] = useState({ x: 0, y: 0 })
    const [isShifting, setIsShifting] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const container: MutableRefObject<HTMLDivElement> = useRef()

    const stylePosition = useMemo(() => {
        return {
            left: currentPosition.x,
            top: currentPosition.y,
            zIndex: isFocus ? 1 : 0,
        }
    }, [currentPosition.x, currentPosition.y, isFocus])

    const handleMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            setIsShifting(true)
            const x = event['pageX'] - container.current['offsetLeft']
            const y = event['pageY'] - container.current['offsetTop']
            setMovementShifting({ x: x, y: y })
        },
        []
    )

    const handleMouseUp = useCallback(() => {
        setIsShifting(false)
    }, [])

    const handleMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            if (isShifting) {
                setCurrentPosition({
                    x: event.clientX - movementShifting.x,
                    y: event.clientY - movementShifting.y,
                })
            }
        },
        [isShifting, movementShifting.x, movementShifting.y]
    )

    const handleFocus = useCallback(() => {
        setIsFocus(true)
    }, [])

    const handleUnFocus = useCallback(() => {
        setIsFocus(false)
    }, [])

    const handleMoiseLeave = useCallback(() => {
        setIsShifting(false)
    }, [])

    return (
        <div
            ref={container}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            className={s.container}
            style={stylePosition}
            onMouseEnter={handleFocus}
            onMouseLeave={handleUnFocus}
        >
            <div
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                className={s.header}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMoiseLeave}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */}
                <div className={s.closeBtn} onClick={props?.handleClose}>
                    X
                </div>
            </div>
            {props.children}
        </div>
    )
}

export { ShiftContainer }
