import { useMemo } from 'react';

type PropsTypes = {
    canBeEquipped: Array<string>;
    name: string;
};

export function ContextDescription(props: PropsTypes) {
    const description = useMemo(() => {
        return (
            <ul>
                {props.canBeEquipped.map((parameter) => {
                    return <li>{parameter}</li>;
                })}
            </ul>
        );
    }, [props.canBeEquipped]);

    return (
        <div
            style={{
                zIndex: 1,
                position: 'absolute',
                cursor: 'pointer',
                background: 'rgba(152,147,48,0.66)',
                top: '75px',
                left: '-25px'
            }}
        >
            <b>{props.name}</b>
            <br />
            <i>Может быть экипированно:</i>
            <hr />
            {description}
        </div>
    );
}
