import { codeGenerator } from '../utils/code-generator';
import { HUDTypes } from '../types';
import { HUD, Types } from '../types/HUD';
import utils from '../utils';
import { HUDBuilder } from '../core/interface/HUD/HUD-utils';
import { useAppDispatch } from '../redux/hooks';
import { addHUD } from '../redux/HUDReducer';
import { Item } from '../core/interface/HUD/cell-for-items/item/item';

const pseudoData: Array<HUD> = [
    {
        id: 0,
        name: 'ADMIN_PANEL',
        code: codeGenerator(),
        type: HUDTypes.Types.ADMIN_PANEL,
        hasShifting: false,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        zIndex: 0,
        specialData: {
            code: codeGenerator(),
            id: 124,
            todo: 'todo',
        },
        size: { width: 100, height: 100 },
    },
    {
        id: 0,
        name: 'BAG_1',
        code: codeGenerator(),
        type: HUDTypes.Types.BAG,
        hasShifting: false,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        zIndex: 0,
        specialData: {
            id: 0,
            code: codeGenerator(),
            name: 'bag 1',
            x: 9,
            y: 9,
            mass: 5,
            maxLimit: 250,
            inner: [
                {
                    id: 0,
                    name: 'wood',
                    mass: 10,
                    width: 6,
                    height: 2,
                    x: 1,
                    y: 0,
                    z: 0,
                    code: codeGenerator(),
                },
                {
                    id: 1,
                    name: 'stick',
                    mass: 10,
                    width: 1,
                    height: 2,
                    x: 0,
                    y: 0,
                    z: 0,
                    code: codeGenerator(),
                },
                {
                    id: 4,
                    name: 'coal',
                    mass: 1000,
                    width: 2,
                    height: 2,
                    maxStack: 5,
                    x: 5,
                    y: 5,
                    z: 0,
                    code: codeGenerator(),
                },
            ],
        },
        size: { width: 100, height: 100 },
    },
    {
        id: 0,
        name: 'BAG_2',
        code: codeGenerator(),
        type: HUDTypes.Types.BAG,
        hasShifting: false,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        zIndex: 0,
        specialData: {
            id: 0,
            code: codeGenerator(),
            name: 'bag 2',
            x: 7,
            y: 6,
            mass: 5,
            maxLimit: 250,
            inner: [
                {
                    id: 0,
                    name: 'wood',
                    mass: 10,
                    width: 6,
                    height: 2,
                    x: 1,
                    y: 0,
                    z: 0,
                    code: codeGenerator(),
                },
                {
                    id: 1,
                    name: 'stick',
                    mass: 10,
                    width: 1,
                    height: 2,
                    x: 0,
                    y: 0,
                    z: 0,
                    code: codeGenerator(),
                },
            ],
        },
        size: { width: 100, height: 100 },
    },
    {
        id: 9999,
        name: 'Печь',
        code: codeGenerator(),
        type: HUDTypes.Types.FOUNDRY,
        hasShifting: false,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        zIndex: 0,
        specialData: {
            id: 0,
            code: codeGenerator(),
            name: 'ПЕЧЬ 1',
            maxLimit: 250,
            input: null,
            output: null,
        },
        size: { width: 100, height: 100 },
    },

];

export const initData = (data?) => {
    return (data || pseudoData).map((HUD) => {
        return new HUDBuilder(HUD);
    });
};
