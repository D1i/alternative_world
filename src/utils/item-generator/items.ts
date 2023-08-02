enum Name {
    WOOD = 'wood',
    STICK = 'stick',
}


export type Item = {
    id: number,
    name: Name,
    mass: number,
    width: number,
    height: number,
}

export const items: Array<Item> = [
    {
        id: 0,
        name: Name.WOOD,
        mass: 2000,
        width: 6,
        height: 2,
    },
    {
        id: 1,
        name: Name.STICK,
        mass: 50,
        width: 1,
        height: 2,
    }
]
