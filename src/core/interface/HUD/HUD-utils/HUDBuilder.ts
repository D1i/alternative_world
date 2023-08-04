import { HUDTypes } from '../../../../types'
import { Types } from '../../../../types/HUD'

type Position = {
    x: number
    y: number
}

class HUDBuilder implements HUDTypes.HUD {
    id: number
    code: number
    specialData: HUDTypes.Bag | HUDTypes.Profile
    type: HUDTypes.Types
    hasShifting: boolean
    startX: number
    startY: number
    endX: number
    endY: number
    zIndex: number
    size: HUDTypes.Size

    constructor(props: HUDTypes.HUD) {
        this.id = props.id
        this.code = props.code
        this.type = props.type
        this.hasShifting = props.hasShifting
        this.startX = 0
        this.startY = 0
        this.endX = 0
        this.endY = 0
        this.zIndex = props.zIndex
        this.specialData = props.specialData
        this.size = props.size
    }

    calculatedCoordinates = () => {
        this.endX = this.size.width
        this.endY = this.size.height

        return this
    }

    setPosition = (position: Position) => {
        if (this.type === Types.BAG_LIST) {
            console.error(`${this.type} has fixed position`)
            return this
        }
        const { x, y } = position
        const { width, height } = this.size

        this.startX = x
        this.startY = y

        this.endX = x + width
        this.endY = y + height

        return this
    }

    setIndex = (zIndex: number) => {
        this.zIndex = zIndex

        return this
    }
}

export { HUDBuilder }
