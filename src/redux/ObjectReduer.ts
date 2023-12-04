import { createSlice } from '@reduxjs/toolkit';
import { physicPlayers } from 'src/API';
import { GameMapTypes } from 'src/types';
import { PhysicPlayer } from 'src/types/physicPlayer';
import { RootState } from './store';

export interface ObjectState {
    map: GameMapTypes.GameMap | null;
    physicPlayers: Array<PhysicPlayer>;
    currentPlayer: number | null;
}

const initialState: ObjectState = {
    map: null,
    physicPlayers: [],
    currentPlayer: null,
};

const objectReducer = createSlice({
    name: 'Object',
    initialState,
    reducers: {
        setMap: (state: ObjectState, action) => {
            const payload: GameMapTypes.GameMap = action.payload;
            state.map = payload;
        },
        setPhysicPlayers: (state: ObjectState, action) => {
            const payload: Array<PhysicPlayer> = action.payload;
            state.physicPlayers = payload;
        },
        setCurrentPlayer: (state: ObjectState, action) => {
            const payload: number = action.payload;
            state.currentPlayer = payload;
        },
    },
});

export const { setMap, setPhysicPlayers, setCurrentPlayer } =
    objectReducer.actions;

export default objectReducer.reducer;
