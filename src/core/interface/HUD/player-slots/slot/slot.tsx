import { CSSProperties, useCallback, useMemo, useState } from 'react';

import { ContextDescription } from './context-description';

import s from './slot.module.scss';
import { CellForItems } from '../../cell-for-items';
import { Bag, HUD, ItemExemplar } from '../../../../../types/HUD';
import { isNull } from 'lodash';

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
    data: HUD;
    path: string;
};

export function Slot(props: PropsTypes) {
    const [showDescription, setShowDescription] = useState<boolean>(false);

    const description = useMemo(() => {
        return (
            <ContextDescription
                canBeEquipped={props.canBeEquipped}
                name={props.name}
            />
        );
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

    const data: Bag = useMemo(() => {
        const path = props.path.split('/');
        if (!path) {
            return null;
        }
        const item = path.reduce((prevValue, pathCell) => {
            if (!prevValue || prevValue[pathCell]) {
                return null;
            }
            return prevValue[pathCell];
        }, props.data);

        return {
            ...props.data.specialData,
            x: 1,
            y: 1,
            name: props.name,
            maxLimit: 10,
            mass: 250,
            inner: item ? [item] : [],
        };
    }, [props.data]);

    return (
        <div
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={style}
            className={s.container}
        >
            <CellForItems data={data} infinityCell />
            {showDescription && description}
        </div>
    );
}
