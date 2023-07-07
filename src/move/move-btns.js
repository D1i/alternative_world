import {useState} from "react";
import utils from '../utils'
const moveKeys = ['KeyW', 'KeyA', 'KeyS', 'KeyD'];

function showVector(codes) {
    if (codes[0] === 'KeyW') {
        if (codes[1] === 'KeyA') {
            if (codes[2] === 'KeyD') {
                console.log('➚');
                return;
            }
            console.log('⇱');
            return;
        } else if (codes[1] === 'KeyS') {
            console.log('STOP');
            return;
        } else if (codes[1] === 'KeyD') {
            if (codes[2] === 'KeyA') {
                console.log('⇱');
                return;
            }
            console.log('➚');
            return;
        }
        console.log('🠕');
        return;
    } else if (codes[0] === 'KeyA') {
        if (codes[1] === 'KeyW') {
            if (codes[2] === 'KeyD') {
                console.log('➚');
                return;
            }
            console.log('⇱');
            return;
        } else if (codes[1] === 'KeyS') {
            if (codes[1] === 'KeyD') {
                console.log('⬊');
                return;
            }
            console.log('⇙');
            return;
        }
        console.log('🠔');
        return;
    } else if (codes[0] === 'KeyS') {
        if (codes[1] === 'KeyA') {
            if (codes[2] === 'KeyD') {
                console.log('⬊');
                return;
            }
            console.log('⬋');
            return;
        } else if (codes[1] === 'KeyW') {
            console.log('STOP');
            return;
        } else if (codes[1] === 'KeyD') {
            if (codes[2] === 'KeyA') {
                console.log('⬋');
                return;
            }
            console.log('⬊');
            return;
        }
        console.log('🠗');
        return;
    } else if (codes[0] === 'KeyD') {
        if (codes[1] === 'KeyW') {
            if (codes[2] === 'KeyS') {
                console.log('⬊');
                return;
            }
            console.log('➚');
            return;
        } else if (codes[1] === 'KeyA') {
            console.log('STOP');
            return;
        } else if (codes[1] === 'KeyS') {
            console.log('⬊');
            return;
        }
        console.log('🠖');
        return;
    }
}

export function MoveBtns(props) {
    const [moveKeysStack, setMoveKeysStack] = useState([]);

    function handleMoveKeuDown(event) {
        console.clear();
        showVector(moveKeysStack)
        if (!moveKeysStack.includes(event.code) && moveKeys.includes(event.code)) {
            setMoveKeysStack([...moveKeysStack, event.code]);
        }
    }

    function handleMoveKeuUp(event) {
        console.clear();
        showVector(moveKeysStack)
        if (moveKeys.includes(event.code)) {
            setMoveKeysStack([...moveKeysStack.filter(key => key !== event.code)]);
        }
    }

    return (
        <div style={{height: '100vh', width: '100%'}} onKeyDown={handleMoveKeuDown} onKeyUp={handleMoveKeuUp}
             tabIndex='0'>
            {props.children}
        </div>
    )
}
