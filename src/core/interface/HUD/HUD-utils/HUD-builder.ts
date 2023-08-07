import { HUDTypes } from '../../../../types';
import { HUD, HUDSpecialData, Types } from '../../../../types/HUD';
import { bagGenerator } from '../../../../utils/bag-generator';

type Position = {
    x: number;
    y: number;
};

class HUDBuilder implements HUDTypes.HUD {
    id: number;
    name: string;
    code: number;
    specialData: HUDSpecialData;
    type: HUDTypes.Types;
    hasShifting: boolean;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    zIndex: number;
    size: HUDTypes.Size;

    constructor(props: HUDTypes.HUD) {
        this.id = props.id;
        this.name = props.name;
        this.code = props.code;
        this.type = props.type;
        this.hasShifting = props.hasShifting;
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.zIndex = props.zIndex;
        this.specialData = props.specialData;
        this.size = props.size;

        this.generateSpecialData(props.specialData);
    }

    generateSpecialData = (specialDateSource: HUDSpecialData) => {
        switch (this.type) {
            case HUDTypes.Types.ADMIN_PANEL:
                this.specialData = specialDateSource;
                break;
            case HUDTypes.Types.BAG:
                if ('inner' in specialDateSource) {
                    this.specialData = bagGenerator({
                        width: specialDateSource.x,
                        height: specialDateSource.y,
                    })
                        .setId(specialDateSource.id)
                        .setInner(specialDateSource.inner)
                        .bagRename(specialDateSource.name);
                    break;
                }
                this.specialData = specialDateSource;
                break;
            case HUDTypes.Types.BAG_LIST:
                this.specialData = specialDateSource;
                break;
            case HUDTypes.Types.DEV_INFO:
                this.specialData = specialDateSource;
                break;
        }

        return this;
    };

    calculatedCoordinates = () => {
        this.endX = this.size.width;
        this.endY = this.size.height;

        return this;
    };

    setPosition = (position: Position) => {
        if (this.type === Types.BAG_LIST) {
            console.error(`${this.type} has fixed position`);
            return this;
        }
        const { x, y } = position;
        const { width, height } = this.size;

        this.startX = x;
        this.startY = y;

        this.endX = x + width;
        this.endY = y + height;

        return this;
    };

    setIndex = (zIndex: number) => {
        this.zIndex = zIndex;

        return this;
    };

    getSerializableObject = () => {
        // @ts-ignore
        return {
            id: this.id,
            name: this.name,
            code: this.code,
            type: this.type,
            hasShifting: this.hasShifting,
            startX: this.startX,
            startY: this.startY,
            endX: this.endX,
            endY: this.endY,
            zIndex: this.zIndex,
            // @ts-ignore
            specialData: this.specialData?.getSerializableObject
                ? // @ts-ignore
                  this.specialData?.getSerializableObject()
                : this.specialData,
            size: this.size,
        };
    };
}

export { HUDBuilder };
