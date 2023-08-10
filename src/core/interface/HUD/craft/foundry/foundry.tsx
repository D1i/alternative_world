import { CellForItems } from '../../cell-for-items';
import { useMemo } from 'react';

function Foundry(props) {
    const input = useMemo(() => ({...props.data, inner: props.data.input ? [props.data.input] : []}), [props.data]);
    const output = useMemo(() => ({...props.data, inner: props.data.output ? [props.data.output] : []}), [props.data]);
    return (
        <div>
            <b>вход</b>
            <CellForItems infinityCell data={input} target={'input'} />
            <hr />
            <b>выход</b>
            <CellForItems infinityCell data={output} target={'output'} />
        </div>
    );
}

export { Foundry };
