import {ReactNode, useMemo} from "react";

import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {closeBag, closeMainMenu, coreStateSelector, openBag} from "../../../../redux/slicer";

import s from './style.module.scss';

function Bags(): JSX.Element {
    const selectedCoreStateSelector = useAppSelector(coreStateSelector);
    const dispatch = useAppDispatch();

    const bags: ReactNode = useMemo(() => {
        return selectedCoreStateSelector.interface.HUD.inventory.map((bag) => {
            function handleToggleBag() {
                if (selectedCoreStateSelector.interface.HUD.openedBags.find((otherBag) => otherBag.code === bag.code)) {
                    dispatch(closeBag(bag));

                } else {
                    dispatch(openBag(bag));
                }
            }

            return <div key={bag.code} onClick={handleToggleBag}>inventory-{bag.code}</div>
        })
    }, [selectedCoreStateSelector.interface.HUD.inventory, selectedCoreStateSelector.interface.HUD.openedBags, dispatch])

    return (
        <div className={s.bags}>
            {bags}
        </div>
    )
}

export {Bags};
