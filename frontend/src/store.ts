import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        user: userReducer
    } 
});

export type TStore = ReturnType<typeof store.getState>;
export default store;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
