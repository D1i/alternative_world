import { useCallback, useMemo, useState } from 'react';

import { createPlayer } from 'src/API/create-player';

import { Slot } from './slot';

// @ts-ignore
import user from './files/player-icon.png';
import { Format } from './slot/slot';
import { coreStateSelector, openBag } from '../../../../redux/HUDReducer';
import { useAppSelector } from '../../../../redux/hooks';
import { HUDTypes } from '../../../../types';

export function PlayerSlots() {
    const [editionConfig, setEditionConfig] = useState<boolean>(false);
    const selectedCoreStateSelector = useAppSelector(coreStateSelector);

    const player = useMemo(() => {
        return createPlayer();
    }, []);

    const toggleEditionConfig = useCallback(() => {
        setEditionConfig(!editionConfig);
    }, [editionConfig]);

    const settingInterface = useMemo(() => {
        if (!editionConfig) {
            return;
        }

        const data = selectedCoreStateSelector.interface.HUDs.find(
            (HUD) => HUD.type === HUDTypes.Types.PLAYER_AMMUNITION
            // @ts-ignore
        );
        return (
            <>
                <Slot
                    name="Голова"
                    canBeEquipped={['Головные уборы', 'Шлемы']}
                    position={{ x: 75, y: 150 }}
                    format={Format.MEDIUM}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head-ammunition'
                />
                <Slot
                    name="Шея"
                    canBeEquipped={['Ожерелья', 'Защита шеи']}
                    position={{ x: 75, y: 200 }}
                    format={Format.MEDIUM}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head1-ammunition'
                />
                <Slot
                    name="Левое плечо"
                    canBeEquipped={[
                        'Наплечники',
                        'Тяжелые наплечники',
                        'Мешки',
                    ]}
                    position={{ x: 25, y: 225 }}
                    format={Format.MEDIUM}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head2-ammunition'
                />
                <Slot
                    name="Правое плечо"
                    canBeEquipped={[
                        'Наплечники',
                        'Тяжелые наплечники',
                        'Мешки',
                    ]}
                    position={{ x: 125, y: 225 }}
                    format={Format.MEDIUM}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head3-ammunition'
                />
                <Slot
                    name="Левое предплечие"
                    canBeEquipped={[
                        'Броня для предплечий',
                        'Мини-щит',
                        'Браслеты',
                    ]}
                    position={{ x: 25, y: 275 }}
                    format={Format.MEDIUM}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head4-ammunition'
                />
                <Slot
                    name="Правое предплечие"
                    canBeEquipped={[
                        'Броня для предплечий',
                        'Мини-щит',
                        'Браслеты',
                    ]}
                    position={{ x: 125, y: 275 }}
                    format={Format.MEDIUM}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head5-ammunition'
                />
                <Slot
                    name="Грудь"
                    canBeEquipped={['Одежда', 'Нагрудник', 'Кираса']}
                    position={{ x: 75, y: 250 }}
                    format={Format.MEDIUM}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head6-ammunition'
                />
                <Slot
                    name="Живот"
                    canBeEquipped={[
                        'Одежда',
                        'Защита живота',
                        'Ремень',
                        'Барсетка',
                    ]}
                    position={{ x: 75, y: 300 }}
                    format={Format.MEDIUM}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head7-ammunition'
                />
                <Slot
                    name="Ноги"
                    canBeEquipped={['Одежда', 'Защитные штаны']}
                    position={{ x: 75, y: 350 }}
                    format={Format.MEDIUM}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head8-ammunition'
                />
                <Slot
                    name="Ботинки"
                    canBeEquipped={['Обувь']}
                    position={{ x: 75, y: 400 }}
                    format={Format.MEDIUM}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head9-ammunition'
                />
                <Slot
                    name="Спина"
                    canBeEquipped={[
                        'Большая сумка',
                        'Сумка',
                        'Маленькая сумка',
                        'Большие ножны',
                        'Большие ножны и большая подвзяка',
                        'Большие ножны и подвязка',
                        'Ножны и Большая подвязка',
                        'Ножны и подвязка',
                        'Большой колчан',
                        'Колчан',
                        'Колчан и большая подвязка',
                        'Колчан и подвязка',
                    ]}
                    position={{ x: 50, y: 0 }}
                    format={Format.LARGE}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head10-ammunition'
                />
                <Slot
                    name="Левый верх предплечия"
                    canBeEquipped={['Подсумок', 'Бронепластина']}
                    position={{ x: 0, y: 275 }}
                    format={Format.SMALL}
                    data={data}
                    path={'/specialData/ammunition/ammunition/head'}
                    key='head11-ammunition'
                />
                <Slot
                    name="Правый верх предплечия"
                    canBeEquipped={['Подсумок', 'Бронепластина']}
                    position={{ x: 175, y: 275 }}
                    format={Format.SMALL}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head12-ammunition'
                />
                <Slot
                    name="Левый низ предплечия"
                    canBeEquipped={[
                        'Подсумок',
                        'Бронепластина',
                        'Маленькие ножны',
                        'Маленькая подвязка',
                        'Маленький колчан',
                    ]}
                    position={{ x: 0, y: 300 }}
                    format={Format.SMALL}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head13-ammunition'
                />
                <Slot
                    name="Правый низ предплечия"
                    canBeEquipped={[
                        'Подсумок',
                        'Бронепластина',
                        'Маленькие ножны',
                        'Маленькая подвязка',
                        'Маленький колчан',
                    ]}
                    position={{ x: 175, y: 300 }}
                    format={Format.SMALL}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head14-ammunition'
                />
                <Slot
                    name="Левый верх ноги"
                    canBeEquipped={[
                        'Подсумок',
                        'Бронепластина',
                        'Ножны',
                        'Маленькие ножны',
                        'Маленький колчан',
                        'Маленькая подвязка',
                    ]}
                    position={{ x: 50, y: 350 }}
                    format={Format.SMALL}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head15-ammunition'
                />
                <Slot
                    name="Правый верх ноги"
                    canBeEquipped={[
                        'Подсумок',
                        'Бронепластина',
                        'Ножны',
                        'Маленькие ножны',
                        'Маленький колчан',
                        'Маленькая подвязка',
                    ]}
                    position={{ x: 125, y: 350 }}
                    format={Format.SMALL}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head16-ammunition'
                />
                <Slot
                    name="Левый низ ноги"
                    canBeEquipped={[
                        'Подсумок',
                        'Бронепластина',
                        'Маленькие ножны',
                        'Маленький колчан',
                    ]}
                    position={{ x: 50, y: 375 }}
                    format={Format.SMALL}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head17-ammunition'
                />
                <Slot
                    name="Правый низ ноги"
                    canBeEquipped={[
                        'Подсумок',
                        'Бронепластина',
                        'Маленькие ножны',
                        'Маленький колчан',
                    ]}
                    position={{ x: 125, y: 375 }}
                    format={Format.SMALL}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head18-ammunition'
                />
                <Slot
                    name="Перед"
                    canBeEquipped={[
                        'Большая сумка',
                        'Сумка',
                        'Маленькая сумка',
                        'Подсумок',
                        'Бронепластина',
                    ]}
                    position={{ x: 50, y: 500 }}
                    format={Format.LARGE}
                    data={data}
                    path={'specialData/ammunition/ammunition/head'}
                    key='head19-ammunition'
                />
            </>
        );
    }, [player, editionConfig]);
    console.log(editionConfig);
    return (
        <div style={{ position: 'absolute', left: '100px', top: '100px' }}>
            <div onClick={toggleEditionConfig}>
                <img style={{ cursor: 'pointer' }} alt="user" src={user} />
            </div>
            <div
                style={{
                    display: `${!editionConfig ? 'none' : 'block'}`,
                    position: 'relative',
                    width: '200px',
                    height: '650px',
                }}
            >
                {settingInterface}
            </div>
        </div>
    );
}
