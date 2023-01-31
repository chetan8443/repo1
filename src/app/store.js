import { configureStore } from '@reduxjs/toolkit'
import countReducer from '../features/CounterSlice'


export const store = configureStore({
  reducer: {
    masking:countReducer,
  },
})