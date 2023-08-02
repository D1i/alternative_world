import {ReactNode, useCallback, useEffect, useMemo} from "react";

import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {closeBag, closeMainMenu, coreStateSelector, openBag} from "../../../../redux/HUDReducer";

import {playSound} from "../../../audio";

import s from './style.module.scss';

function Bags(): JSX.Element {
    const selectedCoreStateSelector = useAppSelector(coreStateSelector);
    const dispatch = useAppDispatch();

    const handleHover = useCallback(() => {
        playSound(0);
    }, [])

    const bags: ReactNode = useMemo(() => {
        return selectedCoreStateSelector.interface.HUD.inventory.map((bag) => {
            function handleToggleBag() {
                if (selectedCoreStateSelector.interface.HUD.openedBags.find((otherBag) => otherBag.code === bag.code)) {
                    dispatch(closeBag(bag));
                    playSound(2);
                } else {
                    dispatch(openBag(bag));
                    playSound(1);
                }
            }

            return <div
                className={s.bigBag}
                key={bag.code}
                onClick={handleToggleBag}
                onMouseEnter={handleHover}
            ></div>
        })
    }, [selectedCoreStateSelector.interface.HUD.inventory, selectedCoreStateSelector.interface.HUD.openedBags, dispatch, handleHover])

    return (
        <div className={s.bags}>
            {bags}
        </div>
    )
}

export {Bags};
