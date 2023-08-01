import { configureStore } from '@reduxjs/toolkit';
import coreStateReducer from './slicer';
export const store = configureStore({
    reducer: {
        coreStateReducer
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
