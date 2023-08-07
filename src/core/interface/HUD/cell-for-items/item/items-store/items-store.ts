import { Item } from 'src/types/HUD';

import texture from './texture';

export const itemsStore: Array<Item> = [
    {
        id: 0,
        name: 'wood',
        mass: 2000,
        width: 2,
        height: 1,
        maxStack: 1,
    },
    {
        id: 1,
        name: 'stick',
        mass: 10,
        width: 1,
        height: 2,
        maxStack: 10,
    },
    {
        id: 2,
        name: 'iron ore',
        mass: 1000,
        width: 1,
        height: 1,
        maxStack: 1,
    },
    {
        id: 3,
        name: 'iron bullion',
        mass: 500,
        width: 1,
        height: 1,
        maxStack: 1,
    },
    {
        id: 4,
        name: 'coal',
        mass: 1000,
        width: 2,
        height: 2,
        maxStack: 5,
    },
];

export function getTexture(id: number) {
    return texture[id];
}

export function getItemSource(id: number) {
    return itemsStore[id];
}
