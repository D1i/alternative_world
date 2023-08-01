export type Item = {
    id: number,
    code: number,
    name: string,
    x: number,
    y: number,
    z: number,
    mass: number,
    width: number,
    height: number,

}

export type Bag = {
    id: number,
    code: number,
    name: string,
    x: number,
    y: number,
    maxLimit: number,
    mass: number,
    inner: Array<Item>
}
