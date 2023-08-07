import { HUDTypes } from 'src/types';
import { Item, items } from './items';
import { codeGenerator } from '../code-generator';
import { itemsStore } from '../../core/interface/HUD/cell-for-items/item/items-store/items-store';

class ItemExemplarClass implements HUDTypes.ItemExemplar {
    constructor(item: Item) {
        this.id = item.id;
        this.code = codeGenerator();
        this.name = item.name;
        this.mass = item.mass;
        this.width = item.width;
        this.height = item.height;
        this.x = 0;
        this.y = 0;
    }

    code: number;
    height: number;
    id: number;
    mass: number;
    name: string;
    width: number;
    x: number;
    y: number;
    z: number;
}

export function itemGenerator(id) {
    // @ts-ignore
    return new ItemExemplarClass(itemsStore[id]);
}
