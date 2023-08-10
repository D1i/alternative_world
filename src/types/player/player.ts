export enum EmployTypes {
    SMALL_SHEATH = 'SMALL_SHEATH',
    SHEATH = 'SHEATH',
    LARGE_SHEATH = 'LARGE_SHEATH',
    LARGE_SHEATH_WITH_LARGE_GARTER = 'LARGE_SHEATH_WITH_LARGE_GARTER',
    SHEATH_WITH_LARGE_GARTER = 'SHEATH_WITH_LARGE_GARTER',
    LARGE_SHEATH_WITH_GARTER = 'LARGE_SHEATH_WITH_GARTER',
    SHEATH_WITH_GARTER = 'SHEATH_WITH_GARTER',
    SMALL_QUIVER = 'SMALL_QUIVER',
    QUIVER = 'QUIVER',
    LARGE_QUIVER = 'LARGE_QUIVER',
    QUIVER_WITH_LARGE_GARTER = 'QUIVER_WITH_LARGE_GARTER',
    SMALL_GARTER = 'SMALL_GARTER',
    GARTER = 'GARTER',
    LARGE_GARTER = 'LARGE_GARTER',
    SMALL_BAG = 'SMALL_BAG',
    BAG = 'BAG',
    LARGE_BAG = 'LARGE_BAG',
    QUICK_ACCESS_BAG = 'QUICK_ACCESS_BAG',
}

// w1 - h1-h3 small
// w1-w2 - h2-h5 medium
// w2-w5 - h3-h10 large

// 00 00
// 00 00
type EmploySourceParams = {
    id: number;
    code: number;
    name: string;
};

interface SheathSource extends EmploySourceParams {
    type:
        | EmployTypes.SHEATH
        | EmployTypes.SHEATH_WITH_GARTER
        | EmployTypes.LARGE_SHEATH
        | EmployTypes.LARGE_SHEATH_WITH_GARTER
        | EmployTypes.SMALL_SHEATH
        | EmployTypes.SHEATH_WITH_LARGE_GARTER
        | EmployTypes.LARGE_SHEATH_WITH_LARGE_GARTER;
}

interface QuiverSource extends EmploySourceParams {
    type:
        | EmployTypes.SMALL_QUIVER
        | EmployTypes.QUIVER
        | EmployTypes.LARGE_QUIVER
        | EmployTypes.QUIVER_WITH_LARGE_GARTER;
}

interface GarterSource extends EmploySourceParams {
    type:
        | EmployTypes.SMALL_GARTER
        | EmployTypes.GARTER
        | EmployTypes.LARGE_GARTER;
}

interface BagSource extends EmploySourceParams {
    type:
        | EmployTypes.SMALL_BAG
        | EmployTypes.BAG
        | EmployTypes.LARGE_BAG
        | EmployTypes.QUICK_ACCESS_BAG;
}

interface SmallSheath extends SheathSource {
    type: EmployTypes.SMALL_SHEATH;
} // Малые ножны
interface Sheath extends SheathSource {
    type: EmployTypes.SHEATH;
} // Ножны
interface LargeSheath extends SheathSource {
    type: EmployTypes.LARGE_SHEATH;
} // Большие ножны

interface LargeSheathWithLargeGarter extends SheathSource {
    type: EmployTypes.LARGE_SHEATH_WITH_LARGE_GARTER;
} // Большие ножны с большой подвязкой
interface SheathWithLargeGarter extends SheathSource {
    type: EmployTypes.SHEATH_WITH_LARGE_GARTER;
} // Ножны с большой подвязкой
interface LargeSheathWithGarter extends SheathSource {
    type: EmployTypes.SHEATH_WITH_GARTER;
} // Большие ножны с подвязкой
interface SheathWithGarter extends SheathSource {
    type: EmployTypes.SHEATH_WITH_GARTER;
} // Ножны с подвязкой

interface SmallQuiver extends QuiverSource {
    type: EmployTypes.SMALL_QUIVER;
} // Маленький колчан
interface Quiver extends QuiverSource {
    type: EmployTypes.QUIVER;
} // Колчан
interface LargeQuiver extends QuiverSource {
    type: EmployTypes.LARGE_QUIVER;
} // Большой колчан

interface QuiverWithLargeGarter extends QuiverSource {
    type: EmployTypes.QUIVER_WITH_LARGE_GARTER;
} // Колчан с большой подвязкой
interface SmallGarter extends GarterSource {
    type: EmployTypes.SMALL_GARTER;
} // Маленькая подвязка
interface Garter extends GarterSource {
    type: EmployTypes.GARTER;
} // Подвязка
interface LargeGarter extends GarterSource {
    type: EmployTypes.LARGE_GARTER;
} // Больщая подвязка

interface SmallBag extends BagSource {
    type: EmployTypes.SMALL_BAG;
}

interface Bag extends BagSource {
    type: EmployTypes.BAG;
}

interface LargeBag extends BagSource {
    type: EmployTypes.LARGE_BAG;
}

interface QuickAccessBag extends BagSource {
    type: EmployTypes.QUICK_ACCESS_BAG;
}

type Head = {};

type Neck = {};

type Shoulder = {}; // Плечо

type Forearm = {}; // Предплечье

type Stomach = {}; // Живот

type Legs = {};

type Feet = {};

type Ammunition = {
    head: null | Head;
    neck: null | Neck;
    leftShoulder: null | Shoulder;
    rightShoulder: null | Shoulder;
    leftForearm: null | Forearm;
    rightForearm: null | Forearm;
    stomach: null | Stomach;
    legs: Legs;
    feet: Feet;
    leftHand: null;
    rightHand: null;
    back:
        | null
        | Sheath
        | LargeSheath
        | LargeSheathWithLargeGarter
        | SheathWithLargeGarter
        | LargeSheathWithGarter
        | SheathWithGarter
        | Quiver
        | LargeQuiver
        | QuiverWithLargeGarter
        | Garter
        | LargeGarter
        | SmallBag
        | Bag
        | LargeBag;
    Breast: null | SmallBag | Bag | LargeBag | QuickAccessBag;
    leftForearmUp: null | QuickAccessBag;
    rightForearmUp: null | QuickAccessBag;
    leftForearmDown:
        | null
        | QuickAccessBag
        | SmallSheath
        | SmallQuiver
        | SmallGarter;
    rightForearmDown:
        | null
        | QuickAccessBag
        | SmallSheath
        | SmallQuiver
        | SmallGarter;
    leftLegUp:
        | null
        | QuickAccessBag
        | SmallSheath
        | Sheath
        | SmallGarter
        | Garter
        | SmallQuiver;
    rightLegUp:
        | null
        | QuickAccessBag
        | SmallSheath
        | Sheath
        | SmallGarter
        | Garter
        | SmallQuiver;
    leftLegDown: null | QuickAccessBag | SmallSheath;
    rightLegDown: null | QuickAccessBag | SmallSheath;
};

export interface Player {
    name: string;
    visualParams: {};
    characteristics: {};
    effects: {};
    state: {};
    ammunition: Ammunition;
}
