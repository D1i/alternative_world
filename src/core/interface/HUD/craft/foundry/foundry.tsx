import { CellForItems } from '../../cell-for-items';
import { useMemo } from 'react';
import { getItemSource } from '../../cell-for-items/item/items-store/items-store';

import s from './style.module.scss';

function Foundry(props) {
    const input = useMemo(
        () => ({
            ...props.data,
            inner: props.data.input ? [props.data.input] : [],
        }),
        [props.data.input]
    );
    const output = useMemo(
        () => ({
            ...props.data,
            inner: props.data.output ? [props.data.output] : [],
        }),
        [props.data.output]
    );

    const source = useMemo(
        () => ({
            ...props.data,
            inner: props.data.source ? [props.data.source] : [],
        }),
        [props.data.source]
    );

    const fuelSlots = useMemo(() => {
        let unableFuelSlots = 1;

        const item = getItemSource(props.data?.source?.id);

        if (item?.specialData?.bElement) {
            unableFuelSlots =
                props.data.fuelSlotsQuality <= item.specialData.bElement
                    ? props.data.fuelSlotsQuality
                    : item.specialData?.bElement || 0;
        }

        const fuelSlots = [];

        for (let i = 0; i < unableFuelSlots; i++) {
            const fuelSlotName = `fuel-${i}`;

            const fuelSlotData = {
                ...props.data,
                inner: props.data[fuelSlotName]
                    ? [props.data[fuelSlotName]]
                    : [],
            };

            fuelSlots.push(
                <div key={fuelSlotName}>
                    <CellForItems
                        infinityCell
                        data={fuelSlotData}
                        target={fuelSlotName}
                    />
                    <br />
                </div>
            );
        }

        return fuelSlots;
    }, [props.data]);

    return (
        <div className={s.container}>
            <div className={s.source}>
                <b>Энергия</b>
                <CellForItems infinityCell data={source} target={'source'} />
            </div>
            <div className={s.fueldsContainer}>Топливо {fuelSlots}</div>
            <div className={s.input}>
                <b>вход</b>
                <CellForItems infinityCell data={input} target={'input'} />
            </div>
            <div className={s.output}>
                <b>выход</b>
                <CellForItems infinityCell data={output} target={'output'} />
            </div>
        </div>
    );
}

export { Foundry };
