import { InterfaceCore } from './core';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { addHUD, coreStateSelector } from './redux/HUDReducer';

import { InitScreen } from './core/interface/menu/init-screen';
import { MovementCore } from './core/movement';
import { FpsView } from 'react-fps';
import { useEffect } from 'react';
import { initData } from './API/pseudo-data';
import { GraphicCore } from './core/graphic';
import { ObjectCore } from './core/object';

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
            {!selectedCoreStateSelector.interface.initedProcess && (
                <InitScreen />
            )}
            {!selectedCoreStateSelector.interface.menu.main && <MovementCore />}
            <ObjectCore />
            <GraphicCore />

            <InterfaceCore />
            <FpsView left={window.innerWidth - 200} width={200} />
        </div>
    );
}

export { Game };
