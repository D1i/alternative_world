import { createContext, useState } from 'react';
import utils from '../utils';
const moveKeys = ['KeyW', 'KeyA', 'KeyS', 'KeyD'];

const MoveContext = createContext();

function showVector(codes) {
  if (codes[0] === 'KeyW') {
    if (codes[1] === 'KeyA') {
      if (codes[2] === 'KeyD') {
        return '➚';
      }
      return '⬉';
    } else if (codes[1] === 'KeyS') {
      return 'STOP';
    } else if (codes[1] === 'KeyD') {
      if (codes[2] === 'KeyA') {
        return '⬉';
      }
      return '➚';
    }
    return '🠕';
  } else if (codes[0] === 'KeyA') {
    if (codes[1] === 'KeyW') {
      if (codes[2] === 'KeyD') {
        return '➚';
      }
      return '⬉';
    } else if (codes[1] === 'KeyS') {
      if (codes[1] === 'KeyD') {
        return '⬊';
      }
      return '⬋';
    }
    return '🠔';
  } else if (codes[0] === 'KeyS') {
    if (codes[1] === 'KeyA') {
      if (codes[2] === 'KeyD') {
        return '⬊';
      }
      return '⬋';
    } else if (codes[1] === 'KeyW') {
      return 'STOP';
    } else if (codes[1] === 'KeyD') {
      if (codes[2] === 'KeyA') {
        return '⬋';
      }
      return '⬊';
    }
    return '🠗';
  } else if (codes[0] === 'KeyD') {
    if (codes[1] === 'KeyW') {
      if (codes[2] === 'KeyS') {
        return '⬊';
      }
      return '➚';
    } else if (codes[1] === 'KeyA') {
      return 'STOP';
    } else if (codes[1] === 'KeyS') {
      return '⬊';
    }
    return '🠖';
  }
  return 'STOP';
}

export function MoveBtns(props) {
  const [moveKeysStack, setMoveKeysStack] = useState([]);

  function handleMoveKeuDown(event) {
    // console.clear();
    showVector(moveKeysStack);
    if (!moveKeysStack.includes(event.code) && moveKeys.includes(event.code)) {
      setMoveKeysStack([...moveKeysStack, event.code]);
    }
  }

  function handleMoveKeuUp(event) {
    // console.clear();
    showVector(moveKeysStack);
    if (moveKeys.includes(event.code)) {
      setMoveKeysStack([...moveKeysStack.filter((key) => key !== event.code)]);
    }
  }

  return (
    <div
      style={{ height: '100vh', width: '100%' }}
      onKeyDown={handleMoveKeuDown}
      onKeyUp={handleMoveKeuUp}
      tabIndex="0"
    >
      <MoveContext.Provider value={moveKeysStack}>
        {props.children}
      </MoveContext.Provider>
    </div>
  );
}

export { MoveContext, showVector };
