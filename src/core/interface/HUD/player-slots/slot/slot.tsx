import { CSSProperties, useCallback, useMemo, useState } from 'react';

import { ContextDescription } from './context-description';

import s from './slot.module.scss';

export enum Format {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE',
}

type PropsTypes = {
    name: string;
    canBeEquipped: Array<string>;
    position: { x: number; y: number };
    format: Format;
};

export function Slot(props: PropsTypes) {
    const [showDescription, setShowDescription] = useState<boolean>(false);

    const description = useMemo(() => {
        return <ContextDescription canBeEquipped={props.canBeEquipped} name={props.name} />;
    }, [props.canBeEquipped]);

    const style: CSSProperties = useMemo(() => {
        let size = null;

        if (props.format === Format.SMALL) {
            size = 25;
        } else if (props.format === Format.MEDIUM) {
            size = 50;
        } else if (props.format === Format.LARGE) {
            size = 100;
        }

        return {
            left: `${props.position.x}px`,
            top: `${props.position.y}px`,
            width: `${size}px`,
            height: `${size}px`,
        };
    }, [props.position, props.format]);

    const handleEnter = useCallback(() => {
        setShowDescription(true);
    }, []);

    const handleLeave = useCallback(() => {
        setShowDescription(false);
    }, []);

    return (
        <div
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={style}
            className={s.container}
        >
            {showDescription && description}
        </div>
    );
}
