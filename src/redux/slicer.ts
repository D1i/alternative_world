import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

import {Bag} from "../core/types/interfaceCore";

export interface CoreState {
    interface: {
        menu: {
            main: boolean
        }
        HUD: {
            inventory: Array<Bag>,
            openedBags: Array<Bag>
        }
    },
    settings: {
        volme: number
    }
}

const initialState: CoreState = {
    interface: {
        menu: {
            main: true
        },
        HUD: {
            inventory: [
                {
                    id: 1, code: 1, name: 'basic bag', x: 9, y: 9, mass: 5, maxLimit: 250, inner: [{
                        id: 1, name: 'wood', mass: 10, width: 6, height: 2, x: 1, y: 0, z: 0, code: 124124124
                    }, {
                        id: 2, name: 'stick', mass: 10, width: 1, height: 2, x: 0, y: 0, z: 0, code: 4141241
                    }]
                },
                {
                    id: 1, code: 2, name: 'basic test', x: 6, y: 6, mass: 5, maxLimit: 250, inner: [{
                        id: 1, name: 'wood', mass: 10, width: 6, height: 2, x: 0, y: 0, z: 0, code: 4124
                    }, {
                        id: 1, name: 'wood', mass: 10, width: 6, height: 2, x: 0, y: 2, z: 0, code: 1231
                    }]
                }
            ],
            openedBags: []
        }
    },
    settings: {
        volme: 100
    }
}
export const coreStateSlice = createSlice({
    name: "CoreState",
    initialState,
    reducers: {
        openMainMenu: (state) => {
            state.interface.menu.main = true;
        },
        closeMainMenu: (state) => {
            state.interface.menu.main = false;
        },
        openBag: (state, action) => {
            state.interface.HUD.openedBags.push(action.payload);
        },
        closeBag: (state, action) => {
            state.interface.HUD.openedBags = state.interface.HUD.openedBags.filter((bag) => bag.code !== action.payload.code);
        },
        moveItem: (state, action) => {
            state.interface.HUD.inventory
                .find(bag => bag.code === action.payload.code)
                .inner = action.payload;
        },
        moveItemBetweenBags: (state, action) => {
        },
        setVolme: (state, action) => {
            state.settings.volme = action.payload;
        }
    },
});
export const {
    openMainMenu,
    closeMainMenu,
    openBag,
    closeBag,
    moveItem,
    setVolme,
} =
    coreStateSlice.actions;
export const coreStateSelector = (state: RootState) => state.coreStateReducer;
export default coreStateSlice.reducer;
