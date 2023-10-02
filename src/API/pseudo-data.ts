import { codeGenerator } from '../utils/code-generator';
import { HUDTypes, PlayerTypes } from '../types';
import { HUD, Size, Types } from '../types/HUD';
import { HUDBuilder } from '../core/interface/HUD/HUD-utils';

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
                {
                    id: 6,
                    name: 'Средний кристалл пространства',
                    mass: 10,
                    width: 1,
                    height: 1,
                    x: 5,
                    y: 5,
                    z: 0,
                    code: codeGenerator(),
                    maxStack: 1,
                    specialData: {
                        aElement: 1,
                        bElement: 10,
                    },
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
            fuelSlotsQuality: 100,
            source: {
                id: 5,
                name: 'Малый кристалл пространства',
                code: codeGenerator(),
                x: 0,
                y: 0,
                z: 0,
                mass: 10,
                width: 1,
                height: 1,
                maxStack: 1,
                specialData: {
                    aElement: 1,
                    bElement: 2,
                },
            },
        },
        size: { width: 100, height: 100 },
    },
    {
        type: Types.PLAYER_AMMUNITION,
        id: 124124,
        name: 'test',
        code: codeGenerator(),
        hasShifting: false,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        specialData: {
            id: 412512515,
            code: codeGenerator(),
            name: 'test-SD',
            ammunition: {
                name: 'Saya',
                visualParams: undefined,
                characteristics: undefined,
                effects: undefined,
                state: undefined,
                ammunition: {
                    head: {},
                    neck: {},
                    leftShoulder: {},
                    rightShoulder: {},
                    leftForearm: {},
                    rightForearm: {},
                    stomach: {},
                    legs: {},
                    feet: {},
                    leftHand: null,
                    rightHand: null,
                    back: undefined,
                    Breast: undefined,
                    leftForearmUp: undefined,
                    rightForearmUp: undefined,
                    leftForearmDown: undefined,
                    rightForearmDown: undefined,
                    leftLegUp: undefined,
                    rightLegUp: undefined,
                    leftLegDown: undefined,
                    rightLegDown: undefined,
                },
            },
        },
        size: { width: 100, height: 100 },
    },
];

export const initData = (data?) => {
    return (data || pseudoData).map((HUD) => {
        return new HUDBuilder(HUD);
    });
};
