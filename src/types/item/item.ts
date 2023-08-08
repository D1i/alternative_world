export enum ItemTypes {
    STORE_WITH_STACKS = 'STORE_WITH_STACKS',
    STORE = 'STORE',
    SAC = 'SAC', // Мешок
    STACK = 'STACK',
    SIMPLY = 'SIMPLY',
    AMMUNITION = 'AMMUNITION',
    CONSUMABLE = 'CONSUMABLE', // Расходник
}

type Quality<T> = T extends
    | ItemTypes.STORE_WITH_STACKS
    | ItemTypes.SAC
    | ItemTypes.STACK
    ? number
    : never;

type Inner<T> = T extends
    | ItemTypes.STORE_WITH_STACKS
    | ItemTypes.STORE
    | ItemTypes.SAC
    ? []
    : never;

type Durability<T> = T extends ItemTypes.AMMUNITION ? {} : never;

export interface Item<T> {
    id: number;
    type: ItemTypes;
    width: number;
    height: number;
    quality: Quality<T>;
    inner: Inner<T>;
    durability: Durability<T>;
}

export interface ItemExemplar<T> extends Item<T> {
    code: number;

}
