import { createContext, useState } from 'react';
import { showVector, moveKeys } from './utils';
import { keyVector } from 'src/core/types/movementCore';

const MoveContext = createContext<keyVector>([]);

export function MoveBtns(props) {
  const [moveKeysStack, setMoveKeysStack] = useState<keyVector>([]);

  function handleMoveKeuDown(event) {
    showVector(moveKeysStack);
    if (!moveKeysStack.includes(event.code) && moveKeys.includes(event.code)) {
      setMoveKeysStack([...moveKeysStack, event.code]);
    }
  }

  function handleMoveKeuUp(event) {
    showVector(moveKeysStack);
    if (moveKeys.includes(event.code)) {
      setMoveKeysStack([...moveKeysStack.filter((key) => key !== event.code)]);
    }
  }

  return (
    <div
      onKeyDown={(e) => handleMoveKeuDown(e)}
      onKeyUp={(e) => handleMoveKeuUp(e)}
    >
      <MoveContext.Provider value={moveKeysStack}>
        {props.children}
      </MoveContext.Provider>
    </div>
  );
}

export { MoveContext };
