import { sounds } from './../core/audio/sounds/index';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

import { HUDTypes } from 'src/types';
import { Bag, HUD } from '../types/HUD';

import { AudioBuilder } from 'src/core/audio/AudioBuilder';

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

    sounds: Array<string>;
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

    sounds: [],
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
        addSound: (state, action) => {
            state.sounds = [...state.sounds, action.payload];
        },
        clearSound: (state, action) => {
            const index = state.sounds.indexOf(action.payload);
            const sounds = [...state.sounds];
            sounds.splice(index, 1);
            state.sounds = sounds;
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
    addSound,
    clearSound,
} = coreStateSlice.actions;
export const coreStateSelector = (state: RootState) => state.coreStateReducer;
export default coreStateSlice.reducer;
