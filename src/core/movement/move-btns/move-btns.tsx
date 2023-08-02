import { FC } from 'react';

import { createContext, useState } from 'react';
import { moveKeys } from './utils';
import { keyVector } from 'src/core/types/movementCore';

const MoveContext = createContext<keyVector>([]);

interface props {
  children: React.ReactNode;
}

const MoveBtns: FC<props> = (props) => {
  const [moveKeysStack, setMoveKeysStack] = useState<keyVector>([]);

  function handleMoveKeyDown(event) {
    console.log('dsadasasda');

    if (!moveKeysStack.includes(event.code) && moveKeys.includes(event.code)) {
      setMoveKeysStack([...moveKeysStack, event.code]);
    }
  }

  function handleMoveKeyUp(event) {
    if (moveKeys.includes(event.code)) {
      setMoveKeysStack([...moveKeysStack.filter((key) => key !== event.code)]);
    }
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
      }}
      tabIndex={0}
      onKeyDown={handleMoveKeyDown}
      onKeyUp={handleMoveKeyUp}
    >
      <MoveContext.Provider value={moveKeysStack}>
        {props.children}
      </MoveContext.Provider>
    </div>
  );
};

export { MoveContext, MoveBtns };
