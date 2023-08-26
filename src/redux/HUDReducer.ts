import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

import { HUDTypes, ObjectTypes } from 'src/types';
import { Bag, HUD } from '../types/HUD';
import { Mouse, PlayerPhysics } from 'src/types/movement';
import { TILE_SIZE } from 'src/constants';

export interface CoreState {
    interface: {
        initedProcess: boolean;
        menu: {
            main: boolean;
        };
        HUDs: Array<HUD>;
        openedHUDs: Array<HUD>;
    };
    settings: {
        volme: number;
    };
    player: {
        physics: PlayerPhysics;
    };
    map: ObjectTypes.GameMapObj;
    mouse: Mouse;
}

const initialState: CoreState = {
    interface: {
        initedProcess: false,
        menu: {
            main: true,
        },
        HUDs: [],
        openedHUDs: [],
    },
    settings: {
        volme: 100,
    },
    player: {
        physics: {
            size: {
                x: TILE_SIZE / 2,
                y: TILE_SIZE / 2,
                z: TILE_SIZE * 1.5,
            },
            position: {
                x: TILE_SIZE,
                y: TILE_SIZE,
                z: TILE_SIZE * 20,
            },
            speed: {
                base: 200,
                x: 0,
                y: 0,
                z: 0,
            },
            falling: false,
            direction: '🠗',
            state: 'Stand',
        },
    },

    mouse: {
        screenX: 0,
        screenY: 0,
        mapX: 0,
        mapY: 0,
    },
    map: {
        tileSize: 128,
        layers: [],
        width: 0,
        height: 0,
        layersNum: 0,
    },
};

export const coreStateSlice = createSlice({
    name: 'CoreState',
    initialState,
    reducers: {
        openMainMenu: (state) => {
            state.interface.menu.main = true;
        },
        closeMainMenu: (state) => {
            state.interface.menu.main = false;
        },
        openBag: (state, action) => {
            state.interface.openedHUDs.push(action.payload);
        },
        closeBag: (state, action) => {
            state.interface.openedHUDs = state.interface.openedHUDs.filter(
                (bag) => bag.code !== action.payload.code
            );
        },
        moveItemBetweenBags: (state, action) => {},
        setVolme: (state, action) => {
            state.settings.volme = action.payload;
        },
        addHUD: (state, action: { payload: HUD; type: string }) => {
            state.interface.HUDs.push(action.payload);
        },
        initProcess: (state) => {
            state.interface.initedProcess = true;
        },
        editBag: (state, action: { payload: Bag; type: string }) => {
            // @ts-ignore
            state.interface.HUDs[
                state.interface.HUDs.findIndex(
                    // @ts-ignore
                    (HUD) => HUD.specialData?.code === action.payload.code
                )
            ].specialData = action.payload;
        },
        setMap: (state, action) => {
            state.map = action.payload;
        },
        setMouse: (state, action) => {
            state.mouse = action.payload;
        },
        setPlayerPhysics: (state, action) => {
            state.player.physics = action.payload;
        },
    },
});
export const {
    openMainMenu,
    closeMainMenu,
    openBag,
    closeBag,
    setVolme,
    initProcess,
    addHUD,
    editBag,
    setMap,
    setMouse,
    setPlayerPhysics,
} = coreStateSlice.actions;
export const coreStateSelector = (state: RootState) => state.coreStateReducer;
export default coreStateSlice.reducer;
