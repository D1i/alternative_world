import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

import { HUDTypes } from 'src/types';
import { Bag, Foundry, HUD, ItemExemplar } from '../types/HUD';
import { ItemTypes } from '../types/item';

export interface CoreState {
    interface: {
        initedProcess: boolean;
        menu: {
            main: boolean;
        };
        HUDDdata: {
            itemBuffer: null | ItemExemplar;
            exportHUD: null | HUD;
            importHUD: null | HUD;
            itemBufferExportHudTargetSpecificIn: null | string;
            itemBufferExportHudTargetSpecificOut: null | string;
        };
        HUDs: Array<HUD>;
        openedHUDs: Array<HUD>;
    };
    settings: {
        volme: number;
    };
    coreConfig: {
        movement: boolean;
    };
}

const initialState: CoreState = {
    interface: {
        initedProcess: false,
        menu: {
            main: false,
        },
        HUDDdata: {
            itemBuffer: null,
            exportHUD: null,
            importHUD: null,
            itemBufferExportHudTargetSpecificIn: null,
            itemBufferExportHudTargetSpecificOut: null,
        },
        HUDs: [],
        openedHUDs: [],
    },
    settings: {
        volme: 100,
    },
    coreConfig: {
        movement: false,
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
        editBag: (state, action: { payload: Bag | Foundry; type: string }) => {
            state.interface.HUDs[
                state.interface.HUDs.findIndex((HUD) => {
                    return HUD.specialData?.code === action.payload.code;
                })
            ].specialData = action.payload;
        },
        setItemBufferExportHudTargetSpecificIn: (state, action) => {
            state.interface.HUDDdata.itemBufferExportHudTargetSpecificIn =
                action.payload;
        },
        setItemBufferExportHudTargetSpecificOut: (state, action) => {
            state.interface.HUDDdata.itemBufferExportHudTargetSpecificOut =
                action.payload;
        },
        setItemBuffer: (state, acton) => {
            state.interface.HUDDdata.itemBuffer = acton.payload;
        },
        setExportHUD: (state, acton) => {
            state.interface.HUDDdata.exportHUD = acton.payload;
        },
        setImportHUD: (state, acton) => {
            state.interface.HUDDdata.importHUD = acton.payload;
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
    setItemBuffer,
    setImportHUD,
    setExportHUD,
    setItemBufferExportHudTargetSpecificIn,
    setItemBufferExportHudTargetSpecificOut,
} = coreStateSlice.actions;
export const coreStateSelector = (state: RootState) => state.coreStateReducer;
export default coreStateSlice.reducer;
