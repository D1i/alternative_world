import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { closeBag, coreStateSelector } from '../../../redux/HUDReducer'

import { Inventory } from './inventory'
import { useMemo } from 'react'
import { ShiftContainer } from './shift-container'
import { playSound } from '../../audio'
import { HUDLayout } from './HUDLayout'
import { HUDBuilder } from './HUD-utils'
import { HUDTypes } from '../../../types'
import { DATA } from '../../../API'

import s from './HUD-core-styles.module.scss'

function HUDCore(): JSX.Element {
    const selectedCoreStateSelector = useAppSelector(coreStateSelector)
    const dispatch = useAppDispatch()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const inventorys = useMemo(() => {
        return (
            <div>
                {selectedCoreStateSelector.interface.HUD.openedBags.map(
                    (bag) => {
                        function handleClose() {
                            dispatch(closeBag(bag))
                            playSound(2)
                        }

                        return (
                            <ShiftContainer
                                key={bag.code}
                                handleClose={handleClose}
                            >
                                <Inventory
                                    bag={bag}
                                    width={bag.x * 50}
                                    height={bag.y * 50}
                                />
                            </ShiftContainer>
                        )
                    }
                )}
            </div>
        )
    }, [selectedCoreStateSelector.interface.HUD.openedBags, dispatch])

    const HUDS: Array<HUDTypes.HUD> = useMemo(() => {
        return DATA.map((HUD) => new HUDBuilder(HUD).calculatedCoordinates())
    }, [])

    return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        <div className={s.container}>
            <HUDLayout HUDS={HUDS} />
            {/*<Bags/>*/}
            {/*{inventorys}*/}
        </div>
    )
}

export { HUDCore }
