import { InterfaceCore } from './core';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { addHUD, coreStateSelector } from './redux/HUDReducer';

import { InitScreen } from './core/interface/menu/init-screen';
import { MovementCore } from './core/movement';
import { FpsView } from 'react-fps';
import { useEffect } from 'react';
import { initData } from './API/pseudo-data';

function Game() {
    const selectedCoreStateSelector = useAppSelector(coreStateSelector);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (selectedCoreStateSelector.interface.HUDs.length) {
            return;
        }
        initData().forEach((HUD) => {
            dispatch(addHUD(HUD.getSerializableObject()));
        });
    }, []);
    return (
        <div>
            {selectedCoreStateSelector.coreConfig.movement &&
                !selectedCoreStateSelector.interface.initedProcess && (
                    <InitScreen />
                )}
            {selectedCoreStateSelector.coreConfig.movement &&
                !selectedCoreStateSelector.interface.menu.main && (
                    <MovementCore visibilityMode />
                )}
            <InterfaceCore />
            <FpsView left={window.innerWidth - 200} width={200} />
        </div>
    );
}

export { Game };
