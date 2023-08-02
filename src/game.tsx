import { useCallback, useState } from 'react';
import { Button } from '@mui/material';

import { InterfaceCore } from './core';

import { playSound } from './core/audio';
import { MovementCore } from './core/movement';

function Game() {
  const [initedProcess, setInitedProcess] = useState(false);
  const handleInitGameProcesses = useCallback(() => {
    setInitedProcess(true);
    playSound(3);
  }, []);

  if (initedProcess) {
    return (
      <div>
        {/* <AudioCore />
            <InterfaceCore /> */}
        <MovementCore visibilityMode={true} />
        {/* <InterfaceCore/> */}
      </div>
    );
  } else {
    return (
      <Button variant="contained" onClick={handleInitGameProcesses}>
        КЛИКНИТЕ ДЛЯ ИНИЦИАЛИЗАЦИИ ИГРЫ
      </Button>
    );
  }
}

export { Game };
