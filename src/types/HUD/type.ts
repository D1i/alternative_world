export type State = {
    todo: string
}

export type Enchantment = {
    todo: string
}

export interface Item {
    id: number
    name: string
    mass: number
    width: number
    height: number
    maxStack?: number
    durability?: number
    states?: Array<State>
    enchantments?: Array<Enchantment>
}

export interface ItemExemplar extends Item {
    code: number
    x: number
    y: number
    z: number
}

export interface Bag {
    id: number
    code: number
    name: string
    x: number
    y: number
    maxLimit: number
    mass: number
    inner: Array<ItemExemplar>
}

export type Profile = {
    todo: string
}

export type AdminPanel = {
    todo: string
}

export enum Types {
    BAG = 'BAG',
    BAG_LIST = 'BAG_LIST',
    ADMIN_PANEL = 'ADMIN_PANEL',
}

export type Size = {
    width: number
    height: number
}

export type HUD = {
    id: number
    code: number
    type: Types
    hasShifting: boolean
    startX: number
    startY: number
    endX: number
    endY: number
    zIndex?: number
    specialData: Bag | Profile | AdminPanel
    size: Size
}
