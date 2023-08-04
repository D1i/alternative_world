import { Moving } from './Moving'
import { MoveBtns } from './move-btns'

interface props {
    visibilityMode?: boolean
}

function MovementCore(props: props) {
    return (
        <MoveBtns>
            <Moving visibilityMode={props.visibilityMode} />
        </MoveBtns>
    )
}

export { MovementCore }
