import { tailSize } from 'src/core/graphic/constants';
import { chunkAssets } from 'src/core/object/chunkAssets';
import { GameMapTypes } from 'src/types';

const getCollizion = (
    x: number,
    y: number,
    width: number,
    height: number,
    map: GameMapTypes.GameMap,
    prevX: number,
    prevY: number
) => {
    let collizion = false;
    let horisontalCollizon = false;
    let verticalCollizion = false;

    for (let yTail = 0; yTail < map.chunks.length; yTail++) {
        for (let xTail = 0; xTail < map.chunks[yTail].length; xTail++) {
            const chunk = chunkAssets[map.chunks[yTail][xTail]];
            if (!chunk.collision) continue;

            const right = x < xTail * tailSize + tailSize;
            const left = x > xTail * tailSize - width;
            const bot = y < yTail * tailSize + tailSize;
            const top = y > yTail * tailSize - height;

            if (right && left && bot && top) {
                collizion = true;

                const prevRight = prevX < xTail * tailSize + tailSize;
                const prevleft = prevX > xTail * tailSize - width;
                const prevBot = prevY < yTail * tailSize + tailSize;
                const pervTop = prevY > yTail * tailSize - height;

                if (prevRight && prevleft && bot && top) {
                    horisontalCollizon = true;
                }

                if (right && left && prevBot && pervTop) {
                    verticalCollizion = true;
                }

                if (collizion && horisontalCollizon && verticalCollizion) {
                    return [collizion, horisontalCollizon, verticalCollizion];
                }
                // if(vectorSpeed[0] === 1 && vectorSpeed[1] === 1) {
                //     if (index === topIndex) return [x, yTail * tailSize - height];
                //     if (index === botIndex) return [x, yTail * tailSize + tailSize];
                // }
                // else if(vectorSpeed[1] === 0) {
                // }
                // if (index === leftIndex) return [xTail * tailSize - width, y];
                // if (index === rightIndex)
                //     return [xTail * tailSize + tailSize, y];
            }
        }
    }
    return [collizion, horisontalCollizon, verticalCollizion];
};

export { getCollizion };
