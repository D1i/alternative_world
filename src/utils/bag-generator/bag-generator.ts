import { codeGenerator } from '../code-generator';
import { HUDTypes } from '../../types';
import { HUD, ItemExemplar } from '../../types/HUD';
import { itemGenerator } from '../item-generator';

type Size = {
    width: number;
    height: number;
};

class Bag implements Bag {
    id: number;
    code: number;
    name: string;
    x: number;
    y: number;
    maxLimit: number;
    mass: number;
    inner: Array<HUDTypes.ItemExemplar>;

    constructor(size: Size) {
        this.id = 0;
        this.code = codeGenerator();
        this.name = 'bag';
        this.x = size.width;
        this.y = size.height;
        this.maxLimit = 50000;
        this.mass = 1000;
        this.inner = [];
    }

    private itemCollision = (item: HUDTypes.ItemExemplar) => {
        return !!this.inner.find((innerItem: HUDTypes.ItemExemplar) => {
            if (innerItem.code === item.code) {
                return;
            }

            const xCollision =
                (innerItem.x >= item.x &&
                    innerItem.x <= item.x + item.width - 1) ||
                (innerItem.x + innerItem.width - 1 >= item.x &&
                    innerItem.x + innerItem.width - 1 <=
                        item.x + item.width - 1) ||
                (innerItem.x <= item.x + item.width - 1 &&
                    innerItem.x + innerItem.width - 1 >=
                        item.x + item.width - 1);
            const yCollision =
                (innerItem.y >= item.y &&
                    innerItem.y <= item.y + item.height - 1) ||
                (innerItem.y + innerItem.height - 1 >= item.y &&
                    innerItem.y + innerItem.height - 1 <=
                        item.y + item.height - 1) ||
                (innerItem.y <= item.y + item.height - 1 &&
                    innerItem.y + innerItem.height - 1 >=
                        item.y + item.height - 1);
            return xCollision && yCollision;
        });
    };

    setInner = (inner: Array<ItemExemplar>) => {
        this.inner = inner.map((item: HUDTypes.ItemExemplar) => {
            const itemExemplar = itemGenerator(item.id);
            itemExemplar.x = item.x;
            itemExemplar.y = item.y;
            return itemExemplar;
        });

        return this;
    };

    setId = (id: number) => {
        this.id = id;

        return this;
    };

    itemPut = (item: HUDTypes.ItemExemplar) => {
        if (this.itemCollision(item)) {
            return false;
        }

        const innerItem = this.inner.find(
            (innerItem: HUDTypes.ItemExemplar) => innerItem.code === item.code
        );

        let repositionedItem = null;

        if (innerItem) {
            repositionedItem = {
                ...innerItem,
                x: item.x,
                y: item.y,
            };
        } else {
            repositionedItem = item;
        }

        this.inner = [
            ...this.inner.filter(
                (innerItem: HUDTypes.ItemExemplar) =>
                    innerItem.code !== item.code
            ),
            repositionedItem,
        ];

        return true;
    };

    itemAutoPut = (item: HUDTypes.ItemExemplar) => {
        for (let y = 0; y <= this.y - item.height; y++) {
            for (let x = 0; x <= this.x - item.width; x++) {
                const putResult = this.itemPut({ ...item, x: x, y: y });
                if (putResult) {
                    return true;
                }
            }
        }
        return false;
    };

    itemShiftOnOtherBag = (item: HUDTypes.ItemExemplar, bagTarget: Bag) => {};

    dropItem = (item: HUDTypes.ItemExemplar, position) => {};

    bagBreak = () => {};

    bagRename = (name: string) => {
        this.name = name;
    };

    syncWithRedux = () => {};

    bagDrop = () => {};

    bagUpgrade = (components) => {
        // craftSys(upgrade(this.bag, components);
    };
}

export function bagGenerator(size: Size): Bag {
    return new Bag(size);
}
