import {useCallback, useState} from "react";
import {Button} from "@mui/material";

import {InterfaceCore} from "./core";

import {playSound} from "./core/audio";

function Game() {
    const [initedProcess, setInitedProcess] = useState(false);
    const handleInitGameProcesses = useCallback(() => {
        setInitedProcess(true);
        playSound(3);

    }, [])

    if (initedProcess) {
        return (
            <div>
                {/*<AudioCore />
            <InterfaceCore />
            <MovementCore />*/}
                <InterfaceCore/>
            </div>
        )
    } else {
        return <Button variant="contained" onClick={handleInitGameProcesses}>КЛИКНИТЕ ДЛЯ ИНИЦИАЛИЗАЦИИ ИГРЫ</Button>
    }
}

export {Game};
