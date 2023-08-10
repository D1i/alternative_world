export type State = {
    todo: string;
};

export type Enchantment = {
    todo: string;
};

export interface Item {
    id: number;
    name: string;
    mass: number;
    width: number;
    height: number;
    maxStack?: number;
    durability?: number;
    states?: Array<State>;
    enchantments?: Array<Enchantment>;
    specialData?: any;
}

export interface ItemExemplar extends Item {
    code: number;
    x: number;
    y: number;
    z: number;
}

export interface Bag {
    id: number;
    code: number;
    name: string;
    x: number;
    y: number;
    maxLimit: number;
    mass: number;
    inner: Array<ItemExemplar>;
}

export type Profile = {
    code: number;
    id: number;
    todo: string;
};

export type AdminPanel = {
    code: number;
    id: number;
    todo: string;
};

export enum Types {
    BAG = 'BAG',
    BAG_LIST = 'BAG_LIST',
    ADMIN_PANEL = 'ADMIN_PANEL',
    DEV_INFO = 'DEV_INFO',
    FOUNDRY = 'FOUNDRY',
}

export type DevInfo = {
    code: number;
    id: number;
    type: Types.DEV_INFO;
    todo: string;
};

export type Size = {
    width: number;
    height: number;
};

export type Foundry = {
    id: number;
    code: number;
    name: string;
    maxLimit: number;
    input: null | ItemExemplar;
    output: null | ItemExemplar;
    fuelSlotsQuality: number;
    source?: any;
};

export type HUDSpecialData = Bag | Profile | AdminPanel | DevInfo | Foundry;

export type HUD = {
    id: number;
    name: string;
    code: number;
    type: Types;
    hasShifting: boolean;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    zIndex?: number;
    specialData: HUDSpecialData;
    size: Size;
};
