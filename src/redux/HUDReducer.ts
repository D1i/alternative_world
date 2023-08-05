import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

import { HUDTypes } from 'src/types'

interface AudioCollection {
    id: number
    volume: number
}

export interface CoreState {
    interface: {
        menu: {
            main: boolean
        }
        HUD: {
            inventory: Array<HUDTypes.Bag>
            openedBags: Array<HUDTypes.Bag>
            bufferItem: HUDTypes.ItemExemplar | null
            initedProcess: boolean
        }
    }
    settings: {
        volme: number
    }
    audio: {
        played: Array<AudioCollection>
    }
}

const initialState: CoreState = {
    interface: {
        menu: {
            main: true,
        },
        HUD: {
            inventory: [
                {
                    id: 0,
                    code: 1,
                    name: 'basic bag',
                    x: 9,
                    y: 9,
                    mass: 5,
                    maxLimit: 250,
                    inner: [
                        {
                            id: 0,
                            name: 'wood',
                            mass: 10,
                            width: 6,
                            height: 2,
                            x: 1,
                            y: 0,
                            z: 0,
                            code: 124124124,
                        },
                        {
                            id: 1,
                            name: 'stick',
                            mass: 10,
                            width: 1,
                            height: 2,
                            x: 0,
                            y: 0,
                            z: 0,
                            code: 4141241,
                        },
                    ],
                },
                {
                    id: 0,
                    code: 2,
                    name: 'basic test',
                    x: 6,
                    y: 6,
                    mass: 5,
                    maxLimit: 250,
                    inner: [
                        {
                            id: 0,
                            name: 'wood',
                            mass: 10,
                            width: 6,
                            height: 2,
                            x: 0,
                            y: 0,
                            z: 0,
                            code: 4124,
                        },
                        {
                            id: 0,
                            name: 'wood',
                            mass: 10,
                            width: 6,
                            height: 2,
                            x: 0,
                            y: 2,
                            z: 0,
                            code: 1231,
                        },
                    ],
                },
                {
                    id: 0,
                    code: 3,
                    name: 'basic test',
                    x: 15,
                    y: 15,
                    mass: 25,
                    maxLimit: 250,
                    inner: [
                        {
                            id: 1,
                            name: 'stick',
                            mass: 2,
                            width: 1,
                            height: 2,
                            x: 1,
                            y: 0,
                            z: 0,
                            code: 124125,
                        },
                        {
                            id: 1,
                            name: 'stick',
                            mass: 2,
                            width: 1,
                            height: 2,
                            x: 0,
                            y: 0,
                            z: 0,
                            code: 444,
                        },
                    ],
                },
            ],
            openedBags: [],
            bufferItem: null,
            initedProcess: false,
        },
    },
    settings: {
        volme: 100,
    },
    audio: {
        played: [],
    },
}

export const coreStateSlice = createSlice({
    name: 'CoreState',
    initialState,
    reducers: {
        openMainMenu: (state) => {
            state.interface.menu.main = true
        },
        closeMainMenu: (state) => {
            state.interface.menu.main = false
        },
        openBag: (state, action) => {
            state.interface.HUD.openedBags.push(action.payload)
        },
        closeBag: (state, action) => {
            state.interface.HUD.openedBags =
                state.interface.HUD.openedBags.filter(
                    (bag) => bag.code !== action.payload.code
                )
        },
        moveItem: (state, action) => {
            state.interface.HUD.inventory.find(
                (bag) => bag.code === action.payload.code
            ).inner = action.payload
        },
        moveItemBetweenBags: (state, action) => {},
        setBufferItem: (state, action) => {
            state.interface.HUD.bufferItem = action.payload
        },
        setVolme: (state, action) => {
            state.settings.volme = action.payload
        },
        addBag: (state, action) => {
            state.interface.HUD.inventory.push(action.payload)
        },
        initProcess: (state) => {
            state.interface.HUD.initedProcess = true
        },
    },
})
export const {
    openMainMenu,
    closeMainMenu,
    openBag,
    closeBag,
    moveItem,
    setBufferItem,
    setVolme,
    addBag,
    initProcess,
} = coreStateSlice.actions
export const coreStateSelector = (state: RootState) => state.coreStateReducer
export default coreStateSlice.reducer
