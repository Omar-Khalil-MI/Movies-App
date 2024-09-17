import { configureStore } from '@reduxjs/toolkit'
import MoviesReducer from './movieSlice'

export const store = configureStore({
  reducer: {
    movies: MoviesReducer,
  },
})