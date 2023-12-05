import { Move } from './Move';
import { MoveBtns } from './move-btns';

interface props {
    visibilityMode?: boolean;
}

function MovementCore(props: props) {
    return (
        <MoveBtns>
            <Move />
            {/* <Moving visibilityMode={props.visibilityMode} /> */}
        </MoveBtns>
    );
}

export { MovementCore };
