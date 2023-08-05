import { InterfaceCore } from './core'

import { useAppSelector } from './redux/hooks'
import { coreStateSelector } from './redux/HUDReducer'

import { InitScreen } from './core/interface/menu/init-screen'
import { MovementCore } from './core/movement'
import { FpsView } from 'react-fps';

function Game() {
    const selectedCoreStateSelector = useAppSelector(coreStateSelector)

    return (
        <div>
            {!selectedCoreStateSelector.interface.HUD.initedProcess && (
                <InitScreen />
            )}
            {!selectedCoreStateSelector.interface.menu.main && (
                <MovementCore visibilityMode />
            )}
            <InterfaceCore />
            <FpsView left={window.innerWidth - 200} width={200} />
        </div>
    )
}

export { Game }
