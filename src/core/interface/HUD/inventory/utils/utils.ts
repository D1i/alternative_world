// function checkItemOnPosition

import { ItemExemplar } from 'src/types/HUD'

class Utils {
    getCellPosition = function (cellWidth, cellHeight, x, y) {
        return {
            x: Math.floor(x / cellWidth),
            y: Math.floor(y / cellHeight),
        }
    }

    checkItemOnPosition = function (
        content: Array<ItemExemplar>,
        x: number,
        y: number
    ): {
        item: ItemExemplar | null
        shiftingCoordinates: { x: number; y: number }
    } {
        const item: ItemExemplar | null =
            content.find((item) => {
                const xCollision = item.x <= x && x <= item.x + item.width - 1
                const yCollision = item.y <= y && y <= item.y + item.height - 1

                return xCollision && yCollision
            }) || null

        const shiftingCoordinates = {
            x: x - item?.x || 0,
            y: y - item?.y || 0,
        }

        return {
            item,
            shiftingCoordinates,
        }
    }
    collisionBetweenItems = function (
        content: Array<ItemExemplar>,
        item1: ItemExemplar
    ): ItemExemplar | null {
        return (
            content.find((item2) => {
                if (item1.code === item2.code) {
                    return
                }

                const xCollision =
                    (item1.x >= item2.x &&
                        item1.x <= item2.x + item2.width - 1) ||
                    (item1.x + item1.width - 1 >= item2.x &&
                        item1.x + item1.width - 1 <=
                            item2.x + item2.width - 1) ||
                    (item1.x <= item2.x + item2.width - 1 &&
                        item1.x + item1.width - 1 >= item2.x + item2.width - 1)
                const yCollision =
                    (item1.y >= item2.y &&
                        item1.y <= item2.y + item2.height - 1) ||
                    (item1.y + item1.height - 1 >= item2.y &&
                        item1.y + item1.height - 1 <=
                            item2.y + item2.height - 1) ||
                    (item1.y <= item2.y + item2.height - 1 &&
                        item1.y + item1.height - 1 >=
                            item2.y + item2.height - 1)
                return xCollision && yCollision
            }) || null
        )
    }

    collisionOutlineBag = function (
        bagWidth: number,
        bagHeight: number,
        item: ItemExemplar
    ) {
        const xCollision =
            item.x > bagWidth || item.x < 0 || item.x + item.width > bagWidth
        const yCollision =
            item.y > bagHeight || item.y < 0 || item.y + item.height > bagHeight

        return xCollision || yCollision
    }
}

const utils = new Utils()

export { utils }
