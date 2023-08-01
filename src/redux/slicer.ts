import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

import {Bag} from "../core/types/interfaceCore";

export interface CoreState {
    interface: {
        menu: {
            main: boolean
        }
        HUD: {
            inventory: Array<Bag>
        }
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
                    id: 1, code: 5125125125, name: 'basic bag', x: 9, y: 9, mass: 5, maxLimit: 250, inner: [{
                        id: 1, name: 'wood', mass: 10, width: 6, height: 2, x: 1, y: 0, z: 0, code: 124124124
                    }, {
                        id: 2, name: 'stick', mass: 10, width: 1, height: 2, x: 0, y: 0, z: 0, code: 4141241
                    }]
                }
            ]
        }
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
    },
});
export const {openMainMenu, closeMainMenu} =
    coreStateSlice.actions;
export const coreStateSelector = (state: RootState) => state.coreStateReducer;
export default coreStateSlice.reducer;
