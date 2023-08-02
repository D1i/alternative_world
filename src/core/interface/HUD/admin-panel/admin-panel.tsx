import {Button} from "@mui/material";
import {useCallback, useMemo, useState} from "react";

import {CreateItem} from "./panel-components";

import s from './style.module.scss';

function AdminPanel() {
    const [mode, setMode] = useState('CREATE_ITEM');

    const handleSetCreateItemMode = useCallback(() => {
        setMode('CREATE_ITEM');
    }, []);

    const handleSetGiveItemMode = useCallback(() => {
        setMode('GIVE_ITEM');
    }, []);

    const handleSetCreateBagMode = useCallback(() => {
        setMode('CREATE_BAG');
    }, []);

    const functionalInterface = useMemo(() => {
        if (mode === 'CREATE_ITEM') {
            return (<CreateItem/>);
        } else if (mode === 'GIVE_ITEM') {
            return 'GI';
        } else if (mode === 'CREATE_BAG') {
            return 'CB';

        }
    }, [mode])

    return (
        <div className={s.container}>
            <div className={s.mods}>
                <Button onClick={handleSetCreateItemMode}>Создать предмет</Button>
                <Button onClick={handleSetGiveItemMode}>Выдать</Button>
                <Button onClick={handleSetCreateBagMode}>Создать bag</Button>
            </div>
            <div>
                {functionalInterface}
            </div>
        </div>
    )
}

export {AdminPanel};
