import { HUDLayout } from './HUDLayout';

import s from './HUD-core-styles.module.scss';
import { useEffect } from 'react';
import { initData } from '../../../API/pseudo-data';

function HUDCore(): JSX.Element {
    return (
        <div className={s.container}>
            <HUDLayout />
        </div>
    );
}

export { HUDCore };
