import { configureStore } from "@reduxjs/toolkit"
import searchFormReducer from './slices/searchFormSlice'

export const store = configureStore({
 reducer: {
  searchForm: searchFormReducer
 },
 middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>